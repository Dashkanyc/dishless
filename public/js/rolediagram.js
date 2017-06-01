var nodeDataArray = [];
var linkDataArray = [];
var snapshotsarray = [];
var nodeDataArrayDisplayed = [];
var linkDataArrayDisplayed = [];
var snapshotindex = 0;
var animationspeed = 100; // milli seconds
var changedobjects = [];

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
    var level = parseInt(document.getElementById("levelSlider").value);
    myDiagram.findTopLevelGroups().each(function(g) {
        expandGroups(g, 0, level);
    })
    myDiagram.commitTransaction("reexpand");
}

function init() {
    var colors = {
        blue: "#00B5CB",
        orange: "#F47321",
        green: "#C8DA2B",
        gray: "#888",
        white: "#F5F5F5"
    }
    document.getElementById('myDiagramDiv').style.height = 650;
    document.getElementById('secondDiagramDiv').style.height = 650;
    var $ = go.GraphObject.make; // for conciseness in defining templates
    myDiagram =
        $(go.Diagram, 'myDiagramDiv', // create a Diagram for the DIV HTML element
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

      secondDiagram =
             $(go.Diagram, 'secondDiagramDiv', // create a Diagram for the DIV HTML element
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

    // These nodes have text surrounded by a rounded rectangle
    // whose fill color is bound to the node data.
    // The user can drag a node by dragging its TextBlock label.
    // Dragging from the Shape will start drawing a new link.
    myDiagram.nodeTemplate =
       $(go.Node, "Vertical",



             $(go.TextBlock,
               { margin: new go.Margin(3, 0, 0, 0),
                 maxSize: new go.Size(100, 30),
                 isMultiline: false,
                 font: "bold 4pt sans-serif" },
               new go.Binding("text", "text"),
               new go.Binding("fill", "highlight", function(v) { return v ? "pink" : "lightblue"; }),
                              new go.Binding("stroke", "highlight", function(v) { return v ? "red" : "blue"; }),
                              new go.Binding("strokeWidth", "highlight", function(v) { return v ? 3 : 1; })),
             $(go.Picture,
               { maxSize: new go.Size(20, 20) },
               new go.Binding("source", "type", nodePic), new go.Binding("fill", "highlight", function(v) { return v ? "pink" : "lightblue"; }),
                                                                                       new go.Binding("stroke", "highlight", function(v) { return v ? "red" : "blue"; }),
                                                                                       new go.Binding("strokeWidth", "highlight", function(v) { return v ? 3 : 1; })),
             $(go.TextBlock,
               { margin: new go.Margin(3, 0, 0, 0),
                 maxSize: new go.Size(100, 30),font: "bold 4pt sans-serif",
                 isMultiline: false },
               new go.Binding("text", "footer"), new go.Binding("fill", "highlight", function(v) { return v ? "pink" : "lightblue"; }),
                                                                              new go.Binding("stroke", "highlight", function(v) { return v ? "red" : "blue"; }),
                                                                              new go.Binding("strokeWidth", "highlight", function(v) { return v ? 3 : 1; })),


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

         secondDiagram.nodeTemplate = myDiagram.nodeTemplate;

    // Define the appearance and behavior for Links:
    function linkInfo(d) { // Tooltip info for a link data object
        return "Link:\nfrom " + d.from + " to " + d.to;
    }
    // The link shape and arrowhead have their stroke brush data bound to the "color" property
    myDiagram.linkTemplate =
        $(go.Link, {
                toShortLength: 3,
                relinkableFrom: true,
                relinkableTo: true
            }, // allow the user to relink existing links
            $(go.Shape, {
                    strokeWidth: 2
                },
                new go.Binding("stroke", "color")),
            $(go.Shape, {
                    toArrow: "Standard",
                    stroke: null
                },
                new go.Binding("fill", "color")), { // this tooltip Adornment is shared by all links
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

        secondDiagram.linkTemplate = myDiagram.linkTemplate;
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

 secondDiagram.groupTemplateMap.add("OfGroups",
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

/*

  Fetching the hierarchy graph

*/

function startdiagram(){
getJSON('/getiamsnapshots/234234/2342234', function(data) {
    snapshotsarray = data;
    changedobjects = [];
    var delta = jsondiffpatch.diff(jsonobj(data.iamsnapshots[snapshotindex]), jsonobj(data.iamsnapshots[snapshotindex+1]));
    var highlightset = new Set();

     highlightset.add();


    creatediagram(myDiagram,snapshotindex,highlightset);
    creatediagram(secondDiagram,snapshotindex+1,highlightset);
});
}

function creatediagram(myDiagram,snapshotindex,highlightset){
console.log("adsfasdfsa" + JSON.stringify(highlightset));
 var iamhierarchy = JSON.parse(data.iamsnapshots[snapshotindex]);
    nodeDataArrayDisplayed = [];
    var groups = iamhierarchy.groups;
    var users = iamhierarchy.users;
    var roles = iamhierarchy.roles;
    for(var m = 0; m < users.length; m++){
        var node = {};
        node.key = users[m].UserId; node.footer = users[m].UserId;
        node.text = users[m].UserName;
        node.isGroup = false;
        node.category = "OfNodes";
        node.type = "user";
        //if(highlightset.has(node.key)){node.isHighlighted = true;}else{node.isHighlighted = false;}
        node.isHighlighted = true;
        nodeDataArrayDisplayed.push(node);
   }

   for(var m = 0; m < groups.length; m++){
           var node = {};
           node.key = groups[m].GroupId; node.footer = groups[m].GroupId;
           node.text = groups[m].GroupName;
           node.isGroup = false;
           node.category = "OfNodes";
           node.type = "group";
        if(highlightset.has(node.key)){node.isHighlighted = true;}else{node.isHighlighted = false;}
           node.highlight = false;
           nodeDataArrayDisplayed.push(node);
      }
      for(var m = 0; m < roles.length; m++){
              var node = {};
              node.key = roles[m].RoleId; node.footer = roles[m].RoleId;
              node.text = roles[m].RoleName;
              node.isGroup = false;
              node.category = "OfNodes";
              node.type = "role";
        if(highlightset.has(node.key)){node.isHighlighted = true;}else{node.isHighlighted = false;}
              node.highlight = false;
              nodeDataArrayDisplayed.push(node);
         }
    myDiagram.animationManager.isEnabled = false;
    myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed, linkDataArrayDisplayed);
}

nextsnapshot = function(){
        snapshotindex++;
        linkDataArray = [];
        nodeDataArray = JSON.parse(JSON.parse(snapshotsarray[snapshotindex]).hierarchy);
        nodeDataArrayDisplayed = [];
        for (var j = 0; j < nodeDataArray.length; j++) {
            nodeDataArrayDisplayed.push(nodeDataArray[j]);
        }
        linkDataArrayDisplayed = [];
        for (var j = 0; j < linkDataArray.length; j++) {
            linkDataArrayDisplayed.push(linkDataArray[j]);
        }
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

function filterNodes() {
    nodeDataArrayDisplayed = [];
    for (var j = 0; j < nodeDataArray.length; j++) {
        if (document.getElementById('hidesgcheckbox').checked && ((nodeDataArray[j].type == 'sg') || (nodeDataArray[j].type == 'sggroupbox'))) {} else if (document.getElementById('hidevolumes').checked && ((nodeDataArray[j].type == 'volume') || (nodeDataArray[j].type == 'volumeaz'))) {} else {
            nodeDataArrayDisplayed.push(nodeDataArray[j]);
        }
    }
    linkDataArrayDisplayed = [];
    for (var j = 0; j < linkDataArray.length; j++) {
        linkDataArrayDisplayed.push(linkDataArray[j]);
    }

    myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed, linkDataArrayDisplayed);
}


function showFrontLayer() {
  document.getElementById('myDiagramDiv').style.visibility='visible';
  document.getElementById('secondDiagramDiv').style.visibility='visible';
}
function hideFrontLayer() {
  document.getElementById('bg_mask').style.visibility='hidden';
  document.getElementById('frontlayer').style.visibility='hidden';
}




