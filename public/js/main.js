var nodeDataArray = [];
var linkDataArray = [];
var snapshotsarray = [];
var nodeDataArrayDisplayed = [];
var linkDataArrayDisplayed = [];
var snapshotindex = 0;
var animationspeed = 100; // milli seconds


function stopinstances(d) {
    console.log("stopping instance - " + d.key);
    var instances = [];
    instances.push(d.key);
    var inputjson = {};
    inputjson.instances = instances;
    inputjson.region = region;
    var xhr = new XMLHttpRequest();
    var url = "/stopinstances";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
    var data = JSON.stringify(inputjson);
    xhr.send(data);

}

function rebootinstances(d) {
    console.log("rebooting instance - " + d.key);
    var instances = [];
    instances.push(d.key);
    var inputjson = {};
    inputjson.instances = instances;
    inputjson.region = region;
    var xhr = new XMLHttpRequest();
    var url = "/rebootinstances";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
    var data = JSON.stringify(inputjson);
    xhr.send(data);

}

function expandGroups(g, i, level) {
    if (!(g instanceof go.Group)) return;
    g.isSubGraphExpanded = i < level;
    g.memberParts.each(function(m) {
        expandGroups(m, i + 1, level);
    })
}

function reexpand(e) {
    myDiagram.startTransaction("reexpand");
    var level = hierarchylevel;
    myDiagram.findTopLevelGroups().each(function(g) {
        expandGroups(g, 0, level);
    })
    myDiagram.commitTransaction("reexpand");
}


  function showConnections(node) {
    console.log("show connections called");
    var diagram = node.diagram;
    diagram.startTransaction("highlight");
    // remove any previous highlighting
    diagram.clearHighlighteds();
    // for each Link coming out of the Node, set Link.isHighlighted
    node.findLinksOutOf().each(function(l) { console.log(l.part.data.color);  l.isHighlighted = true; l.part.data.color = "green"});
    // for each Node destination for the Node, set Node.isHighlighted
    node.findNodesOutOf().each(function(n) { n.isHighlighted = true;  n.color = "green"});
    console.log("about to commit transaction");
    diagram.commitTransaction("highlight");
  }

function init() {

  console.log("main.js init()");
         function getnodeinnerhtmldata(data){
            console.log('getnodeinnerhtmldata called');
            var innerhtml = '<table><tr><td>Key</td><td>' + data.key + '</td></tr><tr><td>Text</td><td>' + data.text + '</td></tr></table>';
            return innerhtml;
         }

    var colors = {
        blue: "#00B5CB",
        orange: "#F47321",
        green: "#C8DA2B",
        gray: "#888",
        white: "#F5F5F5"
    }
    document.getElementById("myDiagramDiv").style.height = 650;
    var $ = go.GraphObject.make; // for conciseness in defining templates
    myDiagram =
        $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
            {
                // position the graph in the middle of the diagram
                initialContentAlignment: go.Spot.Center,
                // allow double-click in background to create a new node
                "clickCreatingTool.archetypeNodeData": {
                    text: "Node",
                    color: "white"
                },
                // allow Ctrl-G to call groupSelection()
                "commandHandler.archetypeGroupData": {
                    text: "Group",
                    isGroup: true,
                    color: "blue"
                },
                // enable undo & redo
                "undoManager.isEnabled": true
            });
    // Define the appearance and behavior for Nodes:
    // First, define the shared context menu for all Nodes, Links, and Groups.
    // To simplify this code we define a function for creating a context menu button:
    function makeButton(text, action, visiblePredicate) {
        return $("ContextMenuButton",
            $(go.TextBlock, text), {
                click: action
            },
            // don't bother with binding GraphObject.visible if there's no predicate
            visiblePredicate ? new go.Binding("visible", "", visiblePredicate).ofObject() : {});
    }
    // a context menu is an Adornment with a bunch of buttons in them
    var partContextMenu =
        $(go.Adornment, "Vertical",
            makeButton("Properties",
                function(e, obj) { // OBJ is this Button
                    var contextmenu = obj.part; // the Button is in the context menu Adornment
                    var part = contextmenu.adornedPart; // the adornedPart is the Part that the context menu adorns
                    // now can do something with PART, or with its data, or with the Adornment (the context menu)
                    if (part instanceof go.Link) alert(linkInfo(part.data));
                    else if (part instanceof go.Group) alert(groupInfo(contextmenu));
                    else {

                        document.getElementById('light').style.display = 'block';
                        document.getElementById('fade').style.display = 'block';
                        populateNodeInfoPopup(part.data);
                    }
                }),
            makeButton("Stop",
                function(e, obj) {
                    var contextmenu = obj.part; // the Button is in the context menu Adornment
                    var part = contextmenu.adornedPart; // the adornedPart is the Part that the context menu adorns
                    // now can do something with PART, or with its data, or with the Adornment (the context menu)
                    if (part instanceof go.Link) alert(linkInfo(part.data));
                    else if (part instanceof go.Group) alert(groupInfo(contextmenu));
                    else {
                        stopinstances(part.data);
                    }
                }),
            makeButton("Reboot",
                function(e, obj) {
                    var contextmenu = obj.part; // the Button is in the context menu Adornment
                    var part = contextmenu.adornedPart; // the adornedPart is the Part that the context menu adorns
                    // now can do something with PART, or with its data, or with the Adornment (the context menu)
                    if (part instanceof go.Link) alert(linkInfo(part.data));
                    else if (part instanceof go.Group) alert(groupInfo(contextmenu));
                    else {
                        rebootinstances(part.data);
                    }
                }),
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

    function nodeInfo(d) { // Tooltip info for a node data object
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
                    alignmentFocus: go.Spot.Right,
                    "ButtonBorder.fill": "transperlent"
                }, {
                    click: function(e, obj) {
                         var data = obj.part.data;
                         console.log(data.key);
                         swal({   title: getnodeinnerhtmldata(data),
                                   width: 500,
                                   padding: 20,
                                   background: '/images/info.svg',
                                   html: true
                                   });
                    }
                },$(go.Picture, { desiredSize: new go.Size(10, 10), source: "/images/info.png" })),
            $("Button", {
                                alignment: go.Spot.Left,
                                alignmentFocus: go.Spot.Left,
                                "ButtonBorder.fill": "transperlent"
                            }, {
                                click: function(e, obj) {
                                                             /*   swal({
                                                                  title: 'Add Annotation',
                                                                  input: 'text',
                                                                  showCancelButton: true,
                                                                  inputValidator: function (value) {
                                                                    return new Promise(function (resolve, reject) {
                                                                      if (value) {
                                                                        resolve()
                                                                      } else {
                                                                        reject('Provide Annotation!')
                                                                      }
                                                                    })
                                                                  }
                                                                }).then(function (result) {
                                                                  addannotation(obj.part.data.key,result);
                                                                  swal({
                                                                    type: 'success',
                                                                    html: 'Added Annotation!'
                                                                  })
                                                                }); */

                                                                swal({
                                                                  title: 'Add Annotation - [' + obj.part.data.key + ']',
                                                                  html:
                                                                    '<input id="annotationpopupuserinput" class="swal2-input">' +
                                                                    '<image src="/images/viewannotations.svg" width="25px" height="25px" onclick="showannotationforresource()">',
                                                                  preConfirm: function () {
                                                                    return new Promise(function (resolve) {
                                                                      resolve([
                                                                        document.getElementById('annotationpopupuserinput').value
                                                                      ])
                                                                    })
                                                                  },
                                                                  onOpen: function () {
                                                                    $('#userinput').focus()
                                                                  }
                                                                }).then(function (result) {
                                                                  swal(JSON.stringify(result))
                                                                })
                                }
                            },$(go.Picture,  { width: 10, height: 10, source:"/images/notes.jpeg"}))
        );


    // These nodes have text surrounded by a rounded rectangle
    // whose fill color is bound to the node data.
    // The user can drag a node by dragging its TextBlock label.
    // Dragging from the Shape will start drawing a new link.
    myDiagram.nodeTemplate =
       $(go.Node, "Vertical",

             $(go.TextBlock,
               { margin: new go.Margin(3, 0, 0, 0),
                 maxSize: new go.Size(75, 30),
                 isMultiline: false,
                 font: "bold 4pt sans-serif"},
               new go.Binding("text", "text")),
             $(go.Picture,
               { maxSize: new go.Size(20, 20) },
               new go.Binding("source", "type", nodePic)),
             $(go.TextBlock,
               { margin: new go.Margin(3, 0, 0, 0),
                 maxSize: new go.Size(75, 30),font: "bold 4pt sans-serif",
                 isMultiline: false },
               new go.Binding("text","footer")),

         { // this tooltip Adornment is shared by all nodes
                toolTip: $(go.Adornment, "Auto",
                    $(go.Shape, {
                        fill: "#FFFFCC"
                    }),
                    $(go.TextBlock, {
                            margin: 4
                        }, // the tooltip shows the result of calling nodeInfo(data)
                        new go.Binding("text", "", nodeInfo))
                )
                // this context menu Adornment is shared by all nodes
               //, contextMenu: partContextMenu
            },{
                                                        mouseEnter: function(e, node) { showConnections(node); },
                                                        mouseLeave: function(e,node) {node.diagram.clearHighlighteds();},
                                                        click: function(e, obj) {
                                                                    var node = obj.part;
                                                                    nodeHoverAdornment.adornedObject = node;
                                                                    node.addAdornment("mouseHover", nodeHoverAdornment);
                                                                    }
                                                        }
        );



        myDiagram.secondtemplate =
               $(go.Node, "Vertical",
                     $(go.TextBlock,
                       { margin: new go.Margin(3, 0, 0, 0),
                         maxSize: new go.Size(100, 30),
                         isMultiline: false,
                         font: "bold 4pt sans-serif" },
                       new go.Binding("text", "text")),
                     $(go.Picture,
                       { maxSize: new go.Size(20, 20) },
                       new go.Binding("source", "type", nodePic)),
                     $(go.TextBlock,
                       { margin: new go.Margin(3, 0, 0, 0),
                         maxSize: new go.Size(100, 30),font: "bold 4pt sans-serif",
                         isMultiline: false },
                       "Cx.8large"),

                 { // this tooltip Adornment is shared by all nodes
                        toolTip: $(go.Adornment, "Auto",
                            $(go.Shape, {
                                fill: "#FFFFCC"
                            }),
                            $(go.TextBlock, {
                                    margin: 4
                                }, // the tooltip shows the result of calling nodeInfo(data)
                                new go.Binding("text", "", nodeInfo))
                        )
                        // this context menu Adornment is shared by all nodes
                        //,contextMenu: partContextMenu
                    },{
                                           mouseEnter: nodeMouseEnter,
                                           mouseLeave: nodeMouseLeave
                                           }
                );



    // Define the appearance and behavior for Links:
    function linkInfo(d) { // Tooltip info for a link data object
        return "Link:\nfrom " + d.from + " to " + d.to;
    }
    myDiagram.linkTemplate =
        $(go.Link, {
                routing: go.Link.AvoidsNodes,
                //routing: go.Link.Orthogonal,
                corner: 5
            }, {
                relinkableFrom: false,
                relinkableTo: false, resegmentable: true
            },
            $(go.Shape ,{stroke: "blue"}, {strokeWidth: 1}), // Need to change stroke width from 1-5 based on 'count' and stroke color based on protocol etc
            $(go.Shape, {
                toArrow: "Standard", stroke : "blue"
            }),
            $(go.TextBlock, new go.Binding("text","count"), {stroke : "green"},
                    { segmentIndex: 0, segmentOffset: new go.Point(NaN, NaN),
                      segmentOrientation: go.Link.OrientUpright }),{click: function(e, obj) {
                                                                            console.log('link clicked');
                                                                            swal({   title: obj.part.data.from + '-' + obj.part.data.to ,
                                                                                                                    width: 500,
                                                                                                                    padding: 20,
                                                                                                                    background: '/images/info.svg',
                                                                                                                    html: true
                                                                                                                    });
                                                                                         }
                      }

        );


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


    function finishDrop(e, grp) {
        /*   var ok = (grp !== null ?
               grp.addMembers(grp.diagram.selection, true) :
               e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
           if (!ok) e.diagram.currentTool.doCancel();*/
        console.log("Finish Drop");
    }



    var templmap = new go.Map("string", go.Node);
    templmap.add("secondtemplate", myDiagram.secondtemplate);
    templmap.add("", myDiagram.nodeTemplate);
    myDiagram.nodeTemplateMap = templmap;

    myDiagram.groupTemplateMap.add("OfGroups",
        $(go.Group, "Auto", {
                background: "transparent",
                // highlight when dragging into the Group
                mouseDragEnter: function(e, grp, prev) {
                    // highlightGroup(e, grp, true);
                },
                mouseDragLeave: function(e, grp, next) {
                    // highlightGroup(e, grp, false);
                },
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
        return "Region:\n" + regions[currregionindex];
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

function highlightnode(obj) {
    var shape = obj.findObject("SHAPE");
    shape.fill = "#6DAB80";
    shape.stroke = "#A6E6A1";

};

function stophighlightnode(obj) {
    var shape = obj.findObject("SHAPE");
    // Return the Shape's fill and stroke to the defaults
    shape.fill = obj.data.color;
    shape.stroke = null;
};

getsnapshots(regions[currregionindex],fromts,tots);

nextsnapshot = function(){
        snapshotindex++;
        linkDataArray = [];
        console.log(JSON.parse(snapshotsarray[snapshotindex]).hierarchy); return;
        nodeDataArray = JSON.parse(JSON.parse(snapshotsarray[snapshotindex]).hierarchy);
        nodeDataArrayDisplayed = [];
        for (var j = 0; j < nodeDataArray.length; j++) {
            nodeDataArrayDisplayed.push(nodeDataArray[j]);
        }
        linkDataArrayDisplayed = [];
        for (var j = 0; j < linkDataArray.length; j++) {
            linkDataArrayDisplayed.push(linkDataArray[j]);
        }
        myDiagram.animationManager.isEnabled = false;
        myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed, linkDataArrayDisplayed);
}

function dummy(){
    snapshotindex++;
            if(snapshotindex>=snapshotsarray.length){
                return;
            }else{
                nextsnapshot();
            }
}

playsnapshots = function(){
    snapshotindex = 0;
    every(animationspeed, dummy);
}


