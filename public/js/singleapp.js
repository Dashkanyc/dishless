 var MINLENGTH = 200; // this controls the minimum length of any swimlane
 var MINBREADTH = 20; // this controls the minimum breadth of any non-collapsed swimlane

 // some shared functions
 // this may be called to force the lanes to be laid out again
 function relayoutLanes() {
     myDiagram.nodes.each(function(lane) {
         if (!(lane instanceof go.Group)) return;
         if (lane.category === "Pool") return;
         lane.layout.isValidLayout = false; // force it to be invalid
     });
     myDiagram.layoutDiagram();
 }

 // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
 function relayoutDiagram() {
     myDiagram.layout.invalidateLayout();
     myDiagram.findTopLevelGroups().each(function(g) {
         if (g.category === "Pool") g.layout.invalidateLayout();
     });
     myDiagram.layoutDiagram();
 }

 // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
 function computeMinPoolSize(pool) {
     // assert(pool instanceof go.Group && pool.category === "Pool");
     var len = MINLENGTH;
     pool.memberParts.each(function(lane) {
         // pools ought to only contain lanes, not plain Nodes
         if (!(lane instanceof go.Group)) return;
         var holder = lane.placeholder;
         if (holder !== null) {
             var sz = holder.actualBounds;
             len = Math.max(len, sz.width);
         }
     });
     return new go.Size(len, NaN);
 }

 // compute the minimum size for a particular Lane Group
 function computeLaneSize(lane) {
     // assert(lane instanceof go.Group && lane.category !== "Pool");
     var sz = computeMinLaneSize(lane);
     if (lane.isSubGraphExpanded) {
         var holder = lane.placeholder;
         if (holder !== null) {
             var hsz = holder.actualBounds;
             sz.height = Math.max(sz.height, hsz.height);
         }
     }
     // minimum breadth needs to be big enough to hold the header
     var hdr = lane.findObject("HEADER");
     if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height);
     return sz;
 }

 // determine the minimum size of a Lane Group, even if collapsed
 function computeMinLaneSize(lane) {
     if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
     return new go.Size(MINLENGTH, MINBREADTH);
 }


 // define a custom ResizingTool to limit how far one can shrink a lane Group
 function LaneResizingTool() {
     go.ResizingTool.call(this);
 }
 go.Diagram.inherit(LaneResizingTool, go.ResizingTool);

 LaneResizingTool.prototype.isLengthening = function() {
     return (this.handle.alignment === go.Spot.Right);
 };

 /** @override */
 LaneResizingTool.prototype.computeMinSize = function() {
     var lane = this.adornedObject.part;
     // assert(lane instanceof go.Group && lane.category !== "Pool");
     var msz = computeMinLaneSize(lane); // get the absolute minimum size
     if (this.isLengthening()) { // compute the minimum length of all lanes
         var sz = computeMinPoolSize(lane.containingGroup);
         msz.width = Math.max(msz.width, sz.width);
     } else { // find the minimum size of this single lane
         var sz = computeLaneSize(lane);
         msz.width = Math.max(msz.width, sz.width);
         msz.height = Math.max(msz.height, sz.height);
     }
     return msz;
 };

 /** @override */
 LaneResizingTool.prototype.resize = function(newr) {
     var lane = this.adornedObject.part;
     if (this.isLengthening()) { // changing the length of all of the lanes
         lane.containingGroup.memberParts.each(function(lane) {
             if (!(lane instanceof go.Group)) return;
             var shape = lane.resizeObject;
             if (shape !== null) { // set its desiredSize length, but leave each breadth alone
                 shape.width = newr.width;
             }
         });
     } else { // changing the breadth of a single lane
         go.ResizingTool.prototype.resize.call(this, newr);
     }
     relayoutDiagram(); // now that the lane has changed size, layout the pool again
 };
 // end LaneResizingTool class


 // define a custom grid layout that makes sure the length of each lane is the same
 // and that each lane is broad enough to hold its subgraph
 function PoolLayout() {
     go.GridLayout.call(this);
     this.cellSize = new go.Size(1, 1);
     this.wrappingColumn = 1;
     this.wrappingWidth = Infinity;
     this.isRealtime = false; // don't continuously layout while dragging
     this.alignment = go.GridLayout.Position;
     // This sorts based on the location of each Group.
     // This is useful when Groups can be moved up and down in order to change their order.
     this.comparer = function(a, b) {
         var ay = a.location.y;
         var by = b.location.y;
         if (isNaN(ay) || isNaN(by)) return 0;
         if (ay < by) return -1;
         if (ay > by) return 1;
         return 0;
     };
 }


 go.Diagram.inherit(PoolLayout, go.GridLayout);
 /** @override */
 PoolLayout.prototype.doLayout = function(coll) {
     var diagram = this.diagram;
     if (diagram === null) return;
     diagram.startTransaction("PoolLayout");
     var pool = this.group;
     if (pool !== null && pool.category === "Pool") {
         // make sure all of the Group Shapes are big enough
         var minsize = computeMinPoolSize(pool);
         pool.memberParts.each(function(lane) {
             if (!(lane instanceof go.Group)) return;
             if (lane.category !== "Pool") {
                 var shape = lane.resizeObject;
                 if (shape !== null) { // change the desiredSize to be big enough in both directions
                     var sz = computeLaneSize(lane);
                     shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
                     shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
                     var cell = lane.resizeCellSize;
                     if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                     if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
                 }
             }
         });
     }
     // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
     go.GridLayout.prototype.doLayout.call(this, coll);
     diagram.commitTransaction("PoolLayout");
 };
 // end PoolLayout class


 function init() {
         console.log('Inside Init');
         if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
         var $ = go.GraphObject.make;

         function getnodeinnerhtmldata(data){
            console.log('getnodeinnerhtmldata called');
            var innerhtml = '<table><tr><td>Key</td><td>' + data.key + '</td></tr><tr><td>Text</td><td>' + data.text + '</td></tr></table>';
            return innerhtml;
         }

         myDiagram =
             $(go.Diagram, "myDiagramDiv", {
                 // start everything in the middle of the viewport
                 initialContentAlignment: go.Spot.Center,
                 // use a custom ResizingTool (along with a custom ResizeAdornment on each Group)
                 resizingTool: new LaneResizingTool(),
                 // use a simple layout that ignores links to stack the top-level Pool Groups next to each other
                 layout: $(PoolLayout),
                 // don't allow dropping onto the diagram's background unless they are all Groups (lanes or pools)
                 mouseDragOver: function(e) {
                     if (!e.diagram.selection.all(function(n) {
                             return n instanceof go.Group;
                         })) {
                         e.diagram.currentCursor = 'not-allowed';
                     }
                 },

                 mouseDrop: function(e) {
                     if (!e.diagram.selection.all(function(n) {
                             return n instanceof go.Group;
                         })) {
                         e.diagram.currentTool.doCancel();
                     }
                 },
                 // a clipboard copied node is pasted into the original node's group (i.e. lane).
                 "commandHandler.copiesGroupKey": true,
                 // automatically re-layout the swim lanes after dragging the selection
                 "SelectionMoved": relayoutDiagram, // this DiagramEvent listener is
                 "SelectionCopied": relayoutDiagram, // defined above
                 "animationManager.isEnabled": false,
                 // enable undo & redo
                 "undoManager.isEnabled": true
             });

         // this is shown by the mouseHover event handler
         var nodeHoverAdornment =
             $(go.Adornment, "Spot", {
                     background: "transparent",
                     // hide the Adornment when the mouse leaves it
                     mouseLeave: function(e, obj) {
                         var ad = obj.part;
                         ad.adornedPart.removeAdornment("mouseHover");
                     }
                 },
                 $(go.Placeholder, {
                     background: "transparent", // to allow this Placeholder to be "seen" by mouse events
                     isActionable: true, // needed because this is in a temporary Layer
                     click: function(e, obj) {
                         var node = obj.part.adornedPart;
                         node.diagram.select(node);
                     }
                 }),

                 $("Button", {
                         alignment: go.Spot.Right,
                         alignmentFocus: go.Spot.Left,
                         "ButtonBorder.fill": "transperlent"
                     }, {
                         click: function(e, obj) {
                             //alert("Bye");
                             // Make the modal box appear
                            /* document.getElementById('myDiagramDiv').style.visibility = 'hidden';
                             var modal = document.getElementById('myModal');
                              modal.style.display = "block";*/
                              var data = obj.part.data;
                              console.log(data.key);
                              swal({   title: getnodeinnerhtmldata(data),
                                        width: 1000,
                                        padding: 600,
                                        background: '/images/nodeinfobg.png',
                                        html: true
                                        });
                         }
                     },$(go.Picture,  { width: 25, height: 25, source:"/images/details.jpeg"}))
                    // $(go.TextBlock, "+"))
             );



         function nodeMouseLeave(e, obj) {
             console.log(obj.part.data.key);
             obj.part.data.category = 'mouseovertemplate';
         }

         function nodeMouseEnter(e, obj) {
             console.log(obj.part.data.key);
             obj.part.data.category = '';
         }



         // this is a Part.dragComputation function for limiting where a Node may be dragged
         function stayInGroup(part, pt, gridpt) {
             // don't constrain top-level nodes
             var grp = part.containingGroup;
             if (grp === null) return pt;
             // try to stay within the background Shape of the Group
             var back = grp.resizeObject;
             if (back === null) return pt;
             // allow dragging a Node out of a Group if the Shift key is down
             if (part.diagram.lastInput.shift) return pt;
             var p1 = back.getDocumentPoint(go.Spot.TopLeft);
             var p2 = back.getDocumentPoint(go.Spot.BottomRight);
             var b = part.actualBounds;
             var loc = part.location;
             // find the padding inside the group's placeholder that is around the member parts
             var m = grp.placeholder.padding;
             // now limit the location appropriately
             var x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x - b.x);
             var y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y - b.y);
             return new go.Point(x, y);
         }

         function makeIndicator(color, shape) { // the data property name
             return $(go.Shape,
                 shape, {
                     width: 8,
                     height: 8,
                     fill: color,
                     strokeWidth: 0,
                     margin: 5
                 });
         }

         function makeImagePath(type) {
             return "/images/" + type + ".svg";
         }


         myDiagram.nodeTemplate =
             $(go.Node, "Vertical",
                 $(go.Panel, "Auto", {
                         background: "white"
                     }, {
                         portId: ""
                     },
                     $(go.Panel, "Vertical", // everything within the border
                         /*   $(go.Panel, "Horizontal",  // the row of status indicators
                              makeIndicator("orange","FivePointedStar"),
                              makeIndicator("red","Lightning"),
                              makeIndicator("green","Circle")
                            ),  // end Horizontal Panel*/
                         $(go.Picture, {
                                 width: 32,
                                 height: 32,
                                 margin: 4
                             },
                             new go.Binding("source", "type", makeImagePath))
                     ), // end Vertical Panel

                     // decorations:
                     $(go.Shape, "TriangleUp", {
                             alignment: go.Spot.TopLeft,
                             fill: "yellow",
                             width: 14,
                             height: 14,
                             visible: false
                         },
                         new go.Binding("visible", "info", function(i) {
                             return i ? true : false;
                         })),
                     $(go.Shape, "StopSign", {
                             alignment: go.Spot.TopRight,
                             fill: "red",
                             width: 14,
                             height: 14,
                             visible: false
                         },
                         new go.Binding("visible", "error"))

                 ), // end Auto Panel
                 $(go.TextBlock, {
                         margin: 0,
                         font: "6px sans-serif"
                     },
                     new go.Binding("text")), { // second arg will be this GraphObject, which in this case is the Node itself:
                     doubleClick: function(e, node) {
                         //region = 'us-east-2';
                         //console.log("https://" + region +".console.aws.amazon.com/ec2/v2/home?region=" +region + "#Instances:search=" + node.data.key);
                         // window.open("https://" + region +".console.aws.amazon.com/ec2/v2/home?region=" +region + "#Instances:search=" + node.data.key);
                         console.log(node.data.group);
                     }
                 }, {
                     mouseEnter: nodeMouseEnter,
                     mouseLeave: nodeMouseLeave,
                     mouseHover: function(e, obj) {
                                 var node = obj.part;
                                 nodeHoverAdornment.adornedObject = node;
                                 node.addAdornment("mouseHover", nodeHoverAdornment);}
                 }, {
                     toolTip: // define a tooltip for each node that displays the color as text
                         $(go.Adornment, "Auto",
                             $(go.Shape, {
                                 fill: "#FFFFCC"
                             }),
                             $(go.TextBlock, {
                                     margin: 4
                                 },
                                 new go.Binding("text", "tooltip"))
                         ) // end of Adornment
                 }
             );

         myDiagram.mouseovertemplate = myDiagram.nodeTemplate; // Add a new template here if you want

         function groupStyle() { // common settings for both Lane and Pool Groups
             return [{
                     layerName: "Background", // all pools and lanes are always behind all nodes and links
                     background: "transparent", // can grab anywhere in bounds
                     movable: true, // allows users to re-order by dragging
                     copyable: false, // can't copy lanes or pools
                     avoidable: false, // don't impede AvoidsNodes routed Links
                     minLocation: new go.Point(NaN, -Infinity), // only allow vertical movement
                     maxLocation: new go.Point(NaN, Infinity)
                 },
                 new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
             ];
         }

         // hide links between lanes when either lane is collapsed
         function updateCrossLaneLinks(group) {
             group.findExternalLinksConnected().each(function(l) {
                 l.visible = (l.fromNode.isVisible() && l.toNode.isVisible());
             });
         }

         var templmap = new go.Map("string", go.Node);
         templmap.add("mouseovertemplate", myDiagram.mouseovertemplate);
         templmap.add("", myDiagram.nodeTemplate);
         myDiagram.nodeTemplateMap = templmap;

         // each Group is a "swimlane" with a header on the left and a resizable lane on the right
         myDiagram.groupTemplate =
             $(go.Group, "Horizontal", groupStyle(), {
                     selectionObjectName: "SHAPE", // selecting a lane causes the body of the lane to be highlit, not the label
                     resizable: true,
                     resizeObjectName: "SHAPE", // the custom resizeAdornmentTemplate only permits two kinds of resizing
                     layout: $(go.LayeredDigraphLayout, // automatically lay out the lane's subgraph
                         {
                             isInitial: false, // don't even do initial layout
                             isOngoing: false, // don't invalidate layout when nodes or links are added or removed
                             direction: 0,
                             columnSpacing: 10,
                             layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
                         }),
                     computesBoundsAfterDrag: true, // needed to prevent recomputing Group.placeholder bounds too soon
                     computesBoundsIncludingLinks: false, // to reduce occurrences of links going briefly outside the lane
                     computesBoundsIncludingLocation: true, // to support empty space at top-left corner of lane
                     handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links
                     doubleClick: function(e, grp) {
                         console.log(grp.data.key)
                     },
                     mouseDrop: function(e, grp) { // dropping a copy of some Nodes and Links onto this Group adds them to this Group
                         if (!e.shift) return; // cannot change groups with an unmodified drag-and-drop
                         // don't allow drag-and-dropping a mix of regular Nodes and Groups
                         if (!e.diagram.selection.any(function(n) {
                                 return n instanceof go.Group;
                             })) {
                             var ok = grp.addMembers(grp.diagram.selection, true);
                             if (ok) {
                                 updateCrossLaneLinks(grp);
                             } else {
                                 grp.diagram.currentTool.doCancel();
                             }
                         } else {
                             e.diagram.currentTool.doCancel();
                         }
                     },

                     subGraphExpandedChanged: function(grp) {
                         var shp = grp.resizeObject;
                         if (grp.diagram.undoManager.isUndoingRedoing) return;
                         if (grp.isSubGraphExpanded) {
                             shp.height = grp._savedBreadth;
                         } else {
                             grp._savedBreadth = shp.height;
                             shp.height = NaN;
                         }
                         updateCrossLaneLinks(grp);
                     }
                 },
                 new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
                 // the lane header consisting of a Shape and a TextBlock
                 $(go.Panel, "Horizontal", {
                         name: "HEADER",
                         angle: 270, // maybe rotate the header to read sideways going up
                         alignment: go.Spot.Center
                     },
                     $(go.Panel, "Horizontal", // this is hidden when the swimlane is collapsed
                         new go.Binding("visible", "isSubGraphExpanded").ofObject(),
                         $(go.Shape, "Diamond", {
                                 width: 4,
                                 height: 4,
                                 fill: "white"
                             },
                             new go.Binding("fill", "color")),
                         $(go.TextBlock, // the lane label
                             {
                                 font: "bold 6pt sans-serif",
                                 editable: true,
                                 margin: new go.Margin(2, 0, 0, 0)
                             },
                             new go.Binding("text", "text").makeTwoWay())
                     ),
                     $("SubGraphExpanderButton", {
                         margin: 5
                     }) // but this remains always visible!
                 ), // end Horizontal Panel
                 $(go.Panel, "Auto", // the lane consisting of a background Shape and a Placeholder representing the subgraph
                     $(go.Shape, "Rectangle", // this is the resized object
                         {
                             name: "SHAPE",
                             fill: "white"
                         },
                         new go.Binding("fill", "color"),
                         new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                     $(go.Placeholder, {
                         padding: 12,
                         alignment: go.Spot.TopLeft
                     }),
                     $(go.TextBlock, // this TextBlock is only seen when the swimlane is collapsed
                         {
                             name: "LABEL",
                             font: "bold 8pt sans-serif",
                             editable: true,
                             angle: 0,
                             alignment: go.Spot.TopLeft,
                             margin: new go.Margin(2, 0, 0, 4)
                         },
                         new go.Binding("visible", "isSubGraphExpanded", function(e) {
                             return !e;
                         }).ofObject(),
                         new go.Binding("text", "text").makeTwoWay())
                 ), // end Auto Panel
                 {
                     toolTip: // define a tooltip for each node that displays the color as text
                         $(go.Adornment, "Auto",
                             $(go.Shape, {
                                 fill: "#FFFFCC"
                             }),
                             $(go.TextBlock, {
                                     margin: 4
                                 },
                                 new go.Binding("text", "tooltip"))
                         ) // end of Adornment
                 }

             ); // end Group

         // define a custom resize adornment that has two resize handles if the group is expanded
         myDiagram.groupTemplate.resizeAdornmentTemplate =
             $(go.Adornment, "Spot",
                 $(go.Placeholder),
                 $(go.Shape, // for changing the length of a lane
                     {
                         alignment: go.Spot.Right,
                         desiredSize: new go.Size(7, 50),
                         fill: "lightblue",
                         stroke: "dodgerblue",
                         cursor: "col-resize"
                     },
                     new go.Binding("visible", "", function(ad) {
                         return ad.adornedPart.isSubGraphExpanded;
                     }).ofObject()),
                 $(go.Shape, // for changing the breadth of a lane
                     {
                         alignment: go.Spot.Bottom,
                         desiredSize: new go.Size(50, 7),
                         fill: "lightblue",
                         stroke: "dodgerblue",
                         cursor: "row-resize"
                     },
                     new go.Binding("visible", "", function(ad) {
                         return ad.adornedPart.isSubGraphExpanded;
                     }).ofObject())
             );

         myDiagram.groupTemplateMap.add("Pool",
             $(go.Group, "Auto", groupStyle(), { // use a simple layout that ignores links to stack the "lane" Groups on top of each other
                     layout: $(PoolLayout, {
                             spacing: new go.Size(0, 0)
                         }) // no space between lanes
                 },
                 $(go.Shape, {
                         fill: "white"
                     },
                     new go.Binding("fill", "color")),
                 $(go.Panel, "Table", {
                         defaultColumnSeparatorStroke: "black"
                     },
                     $(go.Panel, "Horizontal", {
                             column: 0,
                             angle: 270
                         }, // VPCID TEXT NEXT
                         $(go.Picture, {
                                 width: 30,
                                 height: 30,
                                 margin: 1
                             },
                             "/images/vpc.svg"),
                         $(go.TextBlock, {
                                 font: "bold 10pt sans-serif",
                                 editable: true,
                                 margin: new go.Margin(2, 0, 0, 0)
                             },
                             new go.Binding("text").makeTwoWay())
                     ),
                     $(go.Placeholder, {
                         column: 1
                     })
                 )
                 // tooltip
                 , {
                     toolTip: // define a tooltip for each node that displays the color as text
                         $(go.Adornment, "Auto",
                             $(go.Shape, {
                                 fill: "#FFFFCC"
                             }),
                             $(go.TextBlock, {
                                     margin: 4
                                 },
                                 new go.Binding("text", "tooltip"))
                         ) // end of Adornment
                 }

             ));

         myDiagram.linkTemplate =
             $(go.Link, {
                     routing: go.Link.AvoidsNodes,
                     corner: 5
                 }, {
                     relinkableFrom: false,
                     relinkableTo: false
                 },
                 $(go.Shape),
                 $(go.Shape, {
                     toArrow: "Standard"
                 }),
                 $(go.Panel, "Auto", // this whole Panel is a link label
                     $(go.Shape, "Rectangle", {
                         fill: "yellow",
                         stroke: "gray"
                     }),
                     $(go.TextBlock, {
                             margin: 3
                         },
                         new go.Binding("text", "count")))

             );




  myDiagram.add(
    $(go.Part,
      {
        layerName: "Grid",  // must be in a Layer that is Layer.isTemporary,
                            // to avoid being recorded by the UndoManager
        _viewPosition: new go.Point(0,0)  // some position in the viewport,
                                           // not in document coordinates
      },
      $(go.TextBlock, "App Layout and Flow", { font: "bold 15pt sans-serif", stroke: "green" })));

  // Whenever the Diagram.position or Diagram.scale change,
  // update the position of all simple Parts that have a _viewPosition property.
  myDiagram.addDiagramListener("ViewportBoundsChanged", function(e) {
    var dia = e.diagram;
    dia.startTransaction("fix Parts");
    // only iterates through simple Parts in the diagram, not Nodes or Links
    dia.parts.each(function(part) {
      // and only on those that have the "_viewPosition" property set to a Point
      if (part._viewPosition) {
        part.position = dia.transformViewToDoc(part._viewPosition);
        part.scale = 1/dia.scale;
      }
    });
    dia.commitTransaction("fix Parts");
  });


         // define some sample graphs in some of the lanes

         /* myDiagram.model = new go.GraphLinksModel(
              samplenodes, samplelinks);*/
         console.log("print link data");
         console.log(linkdata);
         /*  myDiagram.model = new go.GraphLinksModel(
               nodedata, [{from:'i-05f11ed627e06ea17',to:"arn:aws:elasticloadbalancing:us-east-2:445920161782:loadbalancer/app/asg1lb/0c8ec19b8f0d48d3"}]);*/
         myDiagram.model = new go.GraphLinksModel(
             nodedata, linkdata);

         // force all lanes' layouts to be performed
         relayoutLanes();
     } // end init

 // Show the diagram's model in JSON format
 function save() {
     document.getElementById("mySavedModel").value = myDiagram.model.toJson();
     myDiagram.isModified = false;
 }

 function load() {
     myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
     myDiagram.delayInitialization(relayoutDiagram);
 }

 function loadAppData(appname) {
     getJSON('/getsnapshots/234234/2342234/us-east-2', function(data) {
         initglobalvariables(data);
         getJSON('/getappresources/234234/2342234/us-east-2', function(data) {
             appresourceswithtypes = JSON.parse(data[0])[appname].split("||");
             appresources = [];
             appresourcetypes = [];
             for (var t in appresourceswithtypes) {
                 appresources.push(appresourceswithtypes[t].split("|")[0]);
                 appresourcetypes.push(appresourceswithtypes[t].split("|")[1]);
             }
             console.log(appresources); // What you have achieved is , you have the list of resources that make up this app
             // And you have the lookup for these resources inside objectmap .. Now go ahead and create App hierarchy
             // App hierarchy is done at client side and not at server side.
             getJSON('/getflowloglinks10maggr', function(linkdata) {
                 links10maggr = linkdata;
                 linksnapshotposition = links10maggr.length - 1;
                 createAppHierarchy();
             });

             //myDiagram.model =new go.GraphLinksModel(applicationnodelist,[]);
         });

     });
 }

 function createAppHierarchy() {
     var colorindex = 0;
     var vpclist = new Set();
     var azvpclist = new Set();
     var subnetslist = new Set();
     var instanceslist = new Set();
     var nodes = [];
     var sgslist = new Set();
     var volumeslist = new Set();
     var elblist = new Set();
     var services = new Set();




     for (var l in objectmap.elbs) {
         console.log(JSON.stringify(objectmap.elbs[l]));
     }

     var whitelistgroup = {};
     whitelistgroup.key = 'Whitelist';
     whitelistgroup.text = 'Whitelist';
     whitelistgroup.tooltip = 'Whitelist/Objects of Interest/On-Prem';
     whitelistgroup.isGroup = true;
     whitelistgroup.group = 'misc';
     nodes.push(whitelistgroup);

     var blacklistgroup = {};
     blacklistgroup.key = 'Blacklist';
     blacklistgroup.text = 'Blacklist';
     blacklistgroup.tooltip = 'Blacklist';
     blacklistgroup.isGroup = true;
     blacklistgroup.group = 'misc';
     nodes.push(blacklistgroup);

     /* var servicegroupnode = {};
      servicegroupnode.key = 'services-' + region;
      servicegroupnode.text = 'Services';
      servicegroupnode.tooltip = 'Services Availed By App';
      servicegroupnode.isGroup = true;
      nodes.push(servicegroupnode);*/

     var otherservicesgroup = {};
     otherservicesgroup.key = 'otherservices-' + region;
     otherservicesgroup.text = 'Other Services';
     otherservicesgroup.tooltip = 'Other Services Availed By App';
     otherservicesgroup.isGroup = true;
     otherservicesgroup.group = 'services-' + region;
     nodes.push(otherservicesgroup);



     var externalgroup = {};
     externalgroup.key = 'external';
     externalgroup.text = 'External';
     externalgroup.tooltip = 'External';
     externalgroup.isGroup = true;
     externalgroup.group = 'misc';
     nodes.push(externalgroup);

     var s3group = {};
     s3group.key = 's3-' + region;
     s3group.text = 'S3 Buckets';
     s3group.tooltip = 'S3 Buckets';
     s3group.isGroup = true;
     s3group.group = 'mainservices-' + region;
     nodes.push(s3group);

     var kinesisgroup = {};
     kinesisgroup.key = 'kinesis-' + region;
     kinesisgroup.text = 'Kinesis Streams';
     kinesisgroup.tooltip = 'Kinesis Streams';
     kinesisgroup.isGroup = true;
     kinesisgroup.group = 'mainservices-' + region;
     nodes.push(kinesisgroup);

     var efsgroup = {};
     efsgroup.key = 'efs-' + region;
     efsgroup.text = 'EFS';
     efsgroup.tooltip = 'Elastic File Systems';
     efsgroup.isGroup = true;
     efsgroup.group = 'mainservices-' + region;
     nodes.push(efsgroup);



     var dynamogroup = {};
     dynamogroup.key = 'dynamo-' + region;
     dynamogroup.text = 'Dynamo Tables';
     dynamogroup.tooltip = 'Dynamo Tables';
     dynamogroup.isGroup = true;
     dynamogroup.group = 'mainservices-' + region;
     nodes.push(dynamogroup);

     var rdsgroup = {};
     rdsgroup.key = 'rds-' + region;
     rdsgroup.text = 'RDS';
     rdsgroup.tooltip = 'RDS Databases';
     rdsgroup.isGroup = true;
     rdsgroup.group = 'mainservices-' + region;
     console.log(rdsgroup.key);
     nodes.push(rdsgroup);

     var ecgroup = {};
     ecgroup.key = 'ec-' + region;
     ecgroup.text = 'ElastiCache';
     ecgroup.tooltip = 'ElastiCache clusters';
     ecgroup.isGroup = true;
     ecgroup.group = 'mainservices-' + region;
     nodes.push(ecgroup);

     for (var g in currsnapshot.misctags) {
         for (var m in currsnapshot.misctags[g].TagList) {
             if (currsnapshot.misctags[g].TagList[m].Key == apptag && currsnapshot.misctags[g].TagList[m].Value == currapp) {
                 var svcnode = {};
                 svcnode.key = currsnapshot.misctags[g].ResourceId;
                 svcnode.text = currsnapshot.misctags[g].ResourceId;
                 svcnode.isGroup = false;
                 svcnode.type = currsnapshot.misctags[g].ResourceType.toLowerCase();
                 svcnode.tooltip = currsnapshot.misctags[g].ResourceId;
                 svcnode.group = currsnapshot.misctags[g].ResourceType.toLowerCase() + "-" + region; //nodes.push(svcnode);
                 if (svcnode.type == 'rds') {
                     svcnode.text = svcnode.text.split(":")[6];
                 };
                 if (svcnode.type == 'kinesis') {
                     svcnode.key = svcnode.key[0]; // Fix this on the server side
                 }
                 svcnode.category = 'mouseovertemplate';
                 nodes.push(svcnode);
             }
         }

     }

     console.log(currsnapshot.s3.length);
     var allbucketnames = "";
     for (var t in currsnapshot.s3) {
         allbucketnames = allbucketnames + "\n" + currsnapshot.s3[t].Name;
     }
     if (currsnapshot.s3.length > 0) {
         var s3node = {};
         s3node.key = 's3node';
         s3node.text = currsnapshot.s3.length + "-Buckets";
         s3node.isGroup = false;
         s3node.group = 's3-' + region;
         s3node.tooltip = allbucketnames;
         s3node.type = 's3';
         nodes.push(s3node);
     }

     for (var t in appresources) {
         var obj = objectmap[appresources[t]];

         if (appresourcetypes[t] == 'instance') {
             if (!vpclist.has(obj.VpcId)) {
                 vpclist.add(obj.VpcId);
                 var vpcnode = {};
                 vpcnode.key = obj.VpcId;
                 vpcnode.text = obj.VpcId;
                 vpcnode.category = "Pool";
                 vpcnode.isGroup = true;
                 vpcnode.tooltip = obj.VpcId;
                 nodes.push(vpcnode);

                 /* var sggroupnode = {};
                  sggroupnode.key = 'sggroup-' + obj.VpcId;
                  sggroupnode.text = 'SGs of App';
                  sggroupnode.group = obj.VpcId;
                  sggroupnode.isGroup = true;
                  sggroupnode.tooltip = 'All SGs for App';
                  nodes.push(sggroupnode);*/

                 var internetlbgroupnode = {};
                 internetlbgroupnode.key = 'internetlbgroup-' + obj.VpcId;
                 internetlbgroupnode.text = 'Internet-Facing LBs';
                 internetlbgroupnode.isGroup = true;
                 internetlbgroupnode.tooltip = 'Internet Facing Load Balancers that are attached to App';
                 internetlbgroupnode.group = obj.VpcId;
                 internetlbgroupnode.color = '#aaccff';
                 nodes.push(internetlbgroupnode);

                 var servicesgroup = {};
                 servicesgroup.key = 'services-' + region;
                 servicesgroup.text = 'Services';
                 servicesgroup.isGroup = true;
                 servicesgroup.tooltip = 'Services Availed by the App';
                 servicesgroup.group = obj.VpcId;
                 servicesgroup.color = '#f7fafb'
                 nodes.push(servicesgroup);

                 var servicesgroup = {};
                 servicesgroup.key = 'mainservices-' + region;
                 servicesgroup.text = 'Services';
                 servicesgroup.isGroup = true;
                 servicesgroup.tooltip = 'Services Availed by the App';
                 servicesgroup.group = 'services-' + region;
                 servicesgroup.color = '#f7fafb'
                 nodes.push(servicesgroup);

                 var miscgroup = {};
                 miscgroup.key = 'misc';
                 miscgroup.text = 'Outside';
                 miscgroup.isGroup = true;
                 miscgroup.tooltip = 'Outside';
                 miscgroup.group = obj.VpcId;
                 miscgroup.color = '#ccccff';
                 nodes.push(miscgroup);



             }

             if (!azvpclist.has(obj.VpcId + "-" + objectmap[obj.SubnetId].AvailabilityZone)) {
                 var azvpcnode = {};

                 azvpclist.add(obj.VpcId + "-" + objectmap[obj.SubnetId].AvailabilityZone);
                 azvpcnode.key = objectmap[obj.SubnetId].AvailabilityZone;
                 azvpcnode.text = objectmap[obj.SubnetId].AvailabilityZone;
                 azvpcnode.tooltip = objectmap[obj.SubnetId].AvailabilityZone;

                 azvpcnode.isGroup = true;
                 azvpcnode.group = obj.VpcId;
                 azvpcnode.color = lanecolors[colorindex++];
                 nodes.push(azvpcnode);
             }

             if (appresourcetypes[t] == 'instance' && !subnetslist.has(obj.SubnetId)) {
                 subnetslist.add(obj.SubnetId);
                 var subnetnode = {};
                 subnetnode.key = obj.SubnetId;
                 subnetnode.text = obj.SubnetId;
                 subnetnode.group = obj.VpcId + "-" + objectmap[obj.SubnetId].AvailabilityZone;
                 subnetnode.group = objectmap[obj.SubnetId].AvailabilityZone;
                 //subnetnode.group = obj.VpcId;
                 subnetnode.tooltip = obj.SubnetId;
                 subnetnode.number = 0;
                 subnetnode.isGroup = true;
                 nodes.push(subnetnode);
             }


             var node = {};
             node.key = obj.InstanceId;
             node.text = obj.InstanceId;
             node.isGroup = false; //node.group =  obj.SubnetId;
             // node.group = objectmap[obj.SubnetId].AvailabilityZone;
             node.group = obj.SubnetId;
             node.number = 0;
             node.bg = "white";
             node.tooltip = "dsfklsdjaf";
             node.type = 'ec2';

             // Pull all the SGs , LBs attached to the instance


             for (var g in obj.SecurityGroups) {
                 if (!sgslist.has(obj.SecurityGroups[g].GroupId)) {
                     sgslist.add(obj.SecurityGroups[g].GroupId);
                     var sgnode = {};
                     sgnode.key = obj.SecurityGroups[g].GroupId;
                     sgnode.text = obj.SecurityGroups[g].GroupId;
                     sgnode.group = 'sggroup-' + obj.VpcId;
                     sgnode.type = 'sg';
                     sgnode.isGroup = false;
                     //nodes.push(sgnode);
                 }
             }
             nodes.push(node);

             // For now I am adding all LBs need to fix this

             for (var l in objectmap.elbs) {
                 if (!elblist.has(objectmap.elbs[l].LoadBalancerArn)) {
                     elblist.add(objectmap.elbs[l].LoadBalancerArn);
                     var lbnode = {};
                     lbnode.key = objectmap.elbs[l].LoadBalancerArn;
                     lbnode.text = objectmap.elbs[l].LoadBalancerName;
                     lbnode.tooltip = objectmap.elbs[l].LoadBalancerName;
                     lbnode.isGroup = false;
                     lbnode.type = 'elb';
                     lbnode.group = 'internetlbgroup-' + obj.VpcId;
                     nodes.push(lbnode);
                 }
             }




         }


         if (t == appresources.length - 1) {
             for (var n in nodes) {
                 nodes[n].key = nodes[n].key.toLowerCase();
                 nodemap[nodes[n].key] = nodes[n];
             } // This bull shit is being done because fucking ELB name appears in upper case when called using CLI and comes as lower case during flow log
             // Fuck that
             nodedata = nodes;
             console.log(nodedata);
             linksnapshotposition = links10maggr.length - 1; // Show the latest from 10maggr
             linkdata = [];
             getlinkdata(links10maggr[linksnapshotposition].links);
             init();
         }

     }



 }

 function getlinkdata(links) {
     for (var g in links) {
         links[g].from = replaceAll(replaceAll(replaceAll(replaceAll(links[g].from, '00slash00', "/"), '00dash00', '-'), '00colon00', ':'), "00separator00", "|");
         links[g].to = replaceAll(replaceAll(replaceAll(replaceAll(links[g].to, '00slash00', "/"), '00dash00', '-'), '00colon00', ':'), "00separator00", "|");
         var fromparts = links[g].from.split("|");
         var toparts = links[g].to.split("|");
         var linkvar = {};
         if (fromparts.length == 1) {
             linkvar.from = fromparts[0].toLowerCase()
         } else if (fromparts.length == 2) {
             linkvar.from = fromparts[1].toLowerCase()
         };
         if (toparts.length == 1) {
             linkvar.to = toparts[0].toLowerCase()
         } else if (toparts.length == 2) {
             linkvar.to = toparts[1].toLowerCase()
         }
         if (!nodemap[linkvar.from]) {
             linkvar.text = linkvar.from;
             linkvar.from = 'external'
         }
         if (!nodemap[linkvar.to]) {
             linkvar.text = linkvar.to;
             linkvar.to = 'external'
         }

         if (linkvar.from && linkvar.to) {
             linkvar.count = links[g].incoming + links[g].outgoing;
             linkdata.push(linkvar)
         }
     }


 }

 function loadCCData(ccname) {

     currregionindex = 1;
     region = regions[currregionindex];

     getJSON('/getsnapshots/234234/2342234/' + region, function(data) {
         initglobalvariables(data);
         getJSON('/getccresources/234234/2342234/' + region, function(data) {
             console.log(data);

         });

     });
 }

 // String replace all
 function replaceAll(str, find, replace) {
     var $r = "";
     while ($r != str) {
         $r = str;
         str = str.replace(find, replace);
     }
     return str;
 }

