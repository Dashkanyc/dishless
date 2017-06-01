var snapshotsarray = [];
var nodeDataArray = [];
var linkDataArray = [];
var nodeDataArrayDisplayed = [];
var linkDataArrayDisplayed = [];
var snapshotindex = 0;
var animationspeed = 100; // milli seconds
var timeline;

function init() {
    var colors = {
        blue: "#00B5CB",
        orange: "#F47321",
        green: "#C8DA2B",
        gray: "#888",
        white: "#F5F5F5"
    }

    var $ = go.GraphObject.make;
    myDiagram =
        $(go.Diagram, "flowlogdiagramdiv", {
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true
        });

    function makeButton(text, action, visiblePredicate) {
        return $("ContextMenuButton",
            $(go.TextBlock, text), {
                click: action
            },
            visiblePredicate ? new go.Binding("visible", "", visiblePredicate).ofObject() : {});
    }

    var partContextMenu =
        $(go.Adornment, "Vertical",
            makeButton("Annotations",
                function(e, obj) {
                    console.log(obj.part.data.key);
                    document.getElementById('light1').style.display = 'block';
                    document.getElementById('fade1').style.display = 'block';
                    buildannotationcontent(obj.part.data);
                },
                function(o) {
                    return o.diagram.commandHandler.canCopySelection();
                })
        );

    function nodeInfo(d) {
        var str = "Node " + d.key + ": " + d.text + "\n";
        if (d.group)
            str += "member of " + d.group;
        else
            str += "top-level node";
        return str;

    }

    function populateNodeInfoPopup(d) {
        buildinfocontent(d);
    }

    function nodePic(type) {
        return ("/images/" + type + ".png");
    }

    myDiagram.nodeTemplate =
        $(go.Node, "Vertical",
            $(go.TextBlock, {
                    margin: new go.Margin(3, 0, 0, 0),
                    maxSize: new go.Size(100, 30),
                    isMultiline: false,
                    font: "bold 4pt sans-serif"
                },
                new go.Binding("text", "text"),
                new go.Binding("fill", "highlight", function(v) {
                    return v ? "pink" : "lightblue";
                }),
                new go.Binding("stroke", "highlight", function(v) {
                    return v ? "red" : "blue";
                }),
                new go.Binding("strokeWidth", "highlight", function(v) {
                    return v ? 3 : 1;
                })),
            $(go.Picture, {
                    maxSize: new go.Size(20, 20)
                },
                new go.Binding("source", "type", nodePic), new go.Binding("fill", "highlight", function(v) {
                    return v ? "pink" : "lightblue";
                }),
                new go.Binding("stroke", "highlight", function(v) {
                    return v ? "red" : "blue";
                }),
                new go.Binding("strokeWidth", "highlight", function(v) {
                    return v ? 3 : 1;
                })),

            $(go.TextBlock, {
                    margin: new go.Margin(3, 0, 0, 0),
                    maxSize: new go.Size(100, 30),
                    font: "bold 4pt sans-serif",
                    isMultiline: true
                },
                new go.Binding("text", "footer"), new go.Binding("fill", "highlight", function(v) {
                    return v ? "pink" : "lightblue";
                }),
                new go.Binding("stroke", "highlight", function(v) {
                    return v ? "red" : "blue";
                }),
                new go.Binding("strokeWidth", "highlight", function(v) {
                    return v ? 3 : 1;
                })),


            { // this tooltip Adornment is shared by all nodes
                toolTip: $(go.Adornment, "Auto",
                    $(go.Shape, {
                        fill: "#FFFFCC"
                    }),
                    $(go.TextBlock, {
                            margin: 4
                        }, // the tooltip shows the result of calling nodeInfo(data)
                        new go.Binding("text", "", nodeInfo))
                ),
                // this context menu Adornment is shared by all nodes
                  contextMenu: partContextMenu
            }
        );
    // Define the appearance and behavior for Links:
    function linkInfo(d) { // Tooltip info for a link data object
        return "Link:\nfrom " + d.from + " to " + d.to;
    }
    // The link shape and arrowhead have their stroke brush data bound to the "color" property
    myDiagram.linkTemplate =
        $(go.Link, {
                toShortLength: 3,
                relinkableFrom: false,
                relinkableTo: false
            }, // allow the user to relink existing links
           $(go.Shape,
                    new go.Binding("stroke", "color"),
                    new go.Binding("strokeWidth", "width"),
                    new go.Binding("strokeDashArray", "dash")),


                     $(go.TextBlock,                        // this is a Link label
                        new go.Binding("text", "text")),
                        /*
                             $(go.Panel, "Auto",  // this whole Panel is a link label
                                    $(go.Shape, "TenPointedStar", { fill: "yellow", stroke: "gray" }),
                                    $(go.TextBlock, { margin: 3 },
                                      new go.Binding("text", "text"))
                                  ),

                        */

                 { // this tooltip Adornment is shared by all links
                toolTip: $(go.Adornment, "Auto",
                    $(go.Shape, {
                        fill: "#FFFFCC"
                    }),
                    $(go.TextBlock, {
                            margin: 4
                        }, // the tooltip shows the result of calling linkInfo(data)
                        new go.Binding("text", "", linkInfo))
                ),
                // the same context menu Adornment is shared by all links
                contextMenu: partContextMenu
            }
        );

            // This template shows links connecting with label nodes as green and arrow-less.
            myDiagram.linkTemplateMap.add("linkToLink",
              $("Link",
                { relinkableFrom: true, relinkableTo: true },
                $("Shape", { stroke: "#2D9945", strokeWidth: 2 })
              ));


            // GraphLinksModel support for link label nodes requires specifying two properties.
            myDiagram.model =
              $(go.GraphLinksModel,
                { linkLabelKeysProperty: "labelKeys" });

            // Whenever a new Link is drawng by the LinkingTool, it also adds a node data object
            // that acts as the label node for the link, to allow links to be drawn to/from the link.
            myDiagram.toolManager.linkingTool.archetypeLabelNodeData =
              { category: "LinkLabel" };

            // this DiagramEvent handler is called during the linking or relinking transactions
            function maybeChangeLinkCategory(e) {
              var link = e.subject;
              var linktolink = (link.fromNode.isLinkLabel || link.toNode.isLinkLabel);
              e.diagram.model.setCategoryForLinkData(link.data, (linktolink ? "linkToLink" : ""));
            }



    // Define the appearance and behavior for Groups:
    function groupInfo(adornment) { // takes the tooltip or context menu, not a group node data object
        var g = adornment.adornedPart; // get the Group that the tooltip adorns
        var mems = g.memberParts.count;
        var links = 0;
        g.memberParts.each(function(part) {
            if (part instanceof go.Link) links++;
        });
        return "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
    }


    function finishDrop(e, grp) {}

    myDiagram.groupTemplateMap.add("OfGroups",
        $(go.Group, "Auto", {
                background: "transparent",
                mouseDragEnter: function(e, grp, prev) {},
                mouseDragLeave: function(e, grp, next) {},
                computesBoundsAfterDrag: true,
                mouseDrop: finishDrop,
                handlesDragDropForMembers: true
            },
            new go.Binding("background", "isHighlighted", function(h) {
                return h ? "rgba(255,0,0,0.2)" : "transparent";
            }).ofObject(),



            $(go.Shape, "Rectangle", {
                fill: null,
                stroke: "#FFDD33",
                strokeWidth: 2
            }),


            $(go.Panel, "Vertical", // title above Placeholder
                $(go.Panel, "Horizontal", // button next to TextBlock
                    {
                        stretch: go.GraphObject.Horizontal,
                        background: "#FFDD33"
                    },
                    $("SubGraphExpanderButton", {
                        alignment: go.Spot.Right,
                        margin: 5
                    }),
                    $(go.TextBlock, {
                            alignment: go.Spot.Left,
                            editable: true,
                            margin: 5,
                            font: "bold 8px sans-serif",
                            opacity: 0.75,
                            stroke: "#404040"
                        },
                        new go.Binding("text", "text").makeTwoWay())
                ), // end Horizontal Panel
                $(go.Placeholder, {
                    padding: 5,
                    alignment: go.Spot.TopLeft
                })
            ) // end Vertical Panel
        )); // end Group and call to add to template Map


    // Define the behavior for the Diagram background:
    function diagramInfo(model) { // Tooltip info forthe diagram's model
        return "Model:\n" + model.nodeDataArray.length + " nodes, " + model.linkDataArray.length + " links";
    }
    // provide a tooltip for the background of the Diagram, when not over any Part
    myDiagram.toolTip =
        $(go.Adornment, "Auto",
            $(go.Shape, {
                fill: "#FFFFCC"
            }),
            $(go.TextBlock, {
                    margin: 4
                },
                new go.Binding("text", "", diagramInfo))
        );
    // provide a context menu for the background of the Diagram, when not over any Part
    myDiagram.contextMenu =
        $(go.Adornment, "Vertical",
            makeButton("Paste",
                function(e, obj) {
                    e.diagram.commandHandler.pasteSelection(e.diagram.lastInput.documentPoint);
                },
                function(o) {
                    return o.diagram.commandHandler.canPasteSelection();
                }),
            makeButton("Undo",
                function(e, obj) {
                    e.diagram.commandHandler.undo();
                },
                function(o) {
                    return o.diagram.commandHandler.canUndo();
                }),
            makeButton("Redo",
                function(e, obj) {
                    e.diagram.commandHandler.redo();
                },
                function(o) {
                    return o.diagram.commandHandler.canRedo();
                })
        );

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    document.getElementById("levelSlider").value = 3;
    reexpand({});
    var slider = document.getElementById("levelSlider");
    slider.addEventListener('change', reexpand);
    slider.addEventListener('input', reexpand);
}


// This is the general menu command handler, parameterized by the name of the command.
function cxcommand(event, val) {
  if (val === undefined) val = event.currentTarget.id;
  var diagram = myDiagram;
  switch (val) {
    case "cut":  break;
    case "copy":  break;
    case "paste": break;
    case "delete": break;
    case "color": {
      var color = window.getComputedStyle(document.elementFromPoint(event.clientX, event.clientY).parentElement)['background-color'];
        changeColor(diagram, color); break;
    }
  }
  diagram.currentTool.stopTool();
}

Array.prototype.randsplice = function(){
    var ri = Math.floor(Math.random() * this.length);
    var rs = this.splice(ri, 1);
    return rs;
}

Array.prototype.randval = function(){
    var ri = Math.floor(Math.random() * this.length);
    var val = this[ri];
    return val;
}


function initconfigchangestimeline(){
   var container = document.getElementById('configchangestimeline');
   var items = new vis.DataSet([
     {id: 1, content: 'config item 1', start: '2017-01-15'},
     {id: 2, content: 'config item 2', start: '2017-01-16'},
     {id: 3, content: 'config item 3', start: '2017-01-17'},
     {id: 4, content: 'config item 4', start: '2017-01-18'},
     {id: 5, content: 'config item 5', start: '2017-01-19'},
     {id: 6, content: 'config item 6', start: '2017-01-14', type: 'point'}
   ]);
   var options = {};
   timeline = new vis.Timeline(container, items, options);
   timeline.setCurrentTime('2017-01-14');
   linkDataArrayInit = [{from: "subnet123", to: "subnet113",labelKeys: ["subnet123-subnet113"],text: "1.2GB \n ports 22, 443" },{from:"subnet123",to:"subnet124", labelKeys: ["subnet123-subnet124"]},{from:"subnet112",to:"subnet124",color:"red",width:5, dash: [3,5]},
          {from:"i-23123",to:"subnet113"},{from:"i-23124",to:"subnet113"}, {from:"subnet113",to:"Internet"},{from:"jumphost1",to:"Internet"},{from:"igw1" , to:"Internet"},{from:"subnet123",to:"AWSServices",text: "1.2GB \n ports 22, 443"}
   ];

   setTimeout(function() {
       timeline.setCurrentTime('2017-01-15');
       linkDataArray = linkDataArrayInit.randsplice();
           myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
myDiagram.animationManager.stopAnimation();
   }, 1000);
   setTimeout(function() {
       timeline.setCurrentTime('2017-01-16');
       linkDataArray = linkDataArrayInit.randsplice();
           myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
myDiagram.animationManager.stopAnimation();

   }, 2000);
   setTimeout(function() {
       timeline.setCurrentTime('2017-01-17');
       linkDataArray = linkDataArrayInit.randsplice();
           myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
myDiagram.animationManager.stopAnimation();

   }, 3000);
   setTimeout(function() {
       timeline.setCurrentTime('2017-01-18');
       console.log(linkDataArrayInit.randsplice());
           myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
myDiagram.animationManager.stopAnimation();

   }, 4000);
   setTimeout(function() {
       timeline.setCurrentTime('2017-01-19');
       linkDataArray = linkDataArrayInit.randsplice();
           myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
myDiagram.animationManager.stopAnimation();

   }, 5000);

}

function addTitle(diagram){
diagram.add(
    $(go.Part,
      {
        layerName: "Grid",  // must be in a Layer that is Layer.isTemporary,
                            // to avoid being recorded by the UndoManager
        _viewPosition: new go.Point(0,0)  // some position in the viewport,
                                           // not in document coordinates
      },
      $(go.TextBlock, "A Title", { font: "bold 24pt sans-serif", stroke: "green" })));

  // Whenever the Diagram.position or Diagram.scale change,
  // update the position of all simple Parts that have a _viewPosition property.
  diagram.addDiagramListener("ViewportBoundsChanged", function(e) {
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
}

function flashmydiagram() {
    var model = myDiagram.model;
    model.startTransaction("flash");
    var data;
    for (var k = 0; k < model.nodeDataArray.length; k++) {
        data = model.nodeDataArray[k];
        if (data.isHighlighted) {
            model.setDataProperty(data, "highlight", !data.highlight);
        }

    }
    model.commitTransaction("flash");
}


function loop() {
    setTimeout(function() {
        flashmydiagram();
        loop();
    }, 500);
}

loop();