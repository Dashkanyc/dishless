// Filter Variables

function showsgchanged(cb) {
   showsg = cb.checked;
   localStorage.setItem('showsg',showsg);
   filterNodes();
}


function showvolumeschanged(cb) {
   showvolumes = cb.checked;
   localStorage.setItem('showvolumes',showvolumes);
   filterNodes();
}



function showstoppedinstanceschanged(cb) {
   showstoppedinstances = cb.checked;
   localStorage.setItem('showstoppedinstances',showstoppedinstances);
   filterNodes();
}


function hideemptyboxeschanged(cb){
    hideemptyboxes = cb.checked;
    localStorage.setItem('hideemptyboxes',hideemptyboxes);
    filterNodes(); // YET TO CODE FOR FILTERING THIS
}

function hidelinkschanged(cb){
    hidelinks = cb.checked;
    localStorage.setItem('hidelinks',hidelinks);
    filterNodes(); // YET TO CODE FOR FILTERING THIS
}
// End Filter Variables




var getJSON = function(url, successHandler, errorHandler) {
            var xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('get', url, true);
            xhr.onreadystatechange = function() {
                var status;
                if (xhr.readyState == 4) {
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            xhr.send();
};

function runsweep() {
   console.log("Running AWS Sweep");
   $.get("/gosnapshot", function(data) {
       console.log(data);
   });
}

//var awsregions = ['us-east-1','us-east-2','us-west-1','us-west-2','us-gov-west-1','eu-west-1','eu-central-1'];

function after(ms, fn){ setTimeout(fn, ms); }
function every(ms, fn){ setInterval(fn, ms); }


// Shorthanded expression for json stringify and json parse
function jsonstr(d){return JSON.stringify(d);}
function jsonobj(d){return JSON.parse(d);}

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


function dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function initdata(){
nodeDataArray = [
 {key : "i-23123",text:"NODE1",isGroup: false,type: "instance",category: "ofNodes", highlight: false , isHighlighted: false,footer: "M3.xlarge", group: "subnet123"},
 {key : "i-23124",text:"NODE2",isGroup: false,type: "instance",category: "ofNodes", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "subnet123"},
 {key : "i-23126",text:"NODE3",isGroup: false,type: "instance",category: "ofNodes", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "subnet124"},
 {key : "i-23127",text:"NODE4",isGroup: false,type: "instance",category: "ofNodes", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "subnet124"},
 {key : "subnet123",text:"MySubnet1 [subnet123] [10.2.0.0/24]",isGroup: true,type: "subnet",category: "OfGroups", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "vpc-1", zone: "public"},
 {key : "subnet124",text:"MySubnet2 [subnet123] [10.2.1.0/24]",isGroup: true,type: "subnet",category: "OfGroups", highlight: true, isHighlighted: false,footer: "M3.xlarge", group: "vpc-1", zone: "protected"},
 {key : "vpc-1",text:"vpc_10.2 [vpc122] [10.2.0.0/16]",isGroup: true,type: "vpc",category: "OfGroups", highlight: false,isHighlighted: false, footer: "M3.xlarge", group: "us-east-1"},
 {key : "jumphost1",text:"jumphost1",isGroup: false,type: "jumphost",category: "ofNodes", highlight: false, isHighlighted: false,footer: "t2.nano", group: "subnet124"},
 {key : "igw1",text:"igw1",isGroup: false,type: "igw",category: "ofNodes", highlight: false, isHighlighted: false,footer: "t2.nano", group: "vpc-1"},
 {key : "Internet",text:"Internet",isGroup: false,type: "internet",category: "ofNodes", highlight: false, isHighlighted: false,footer: "External Internet"},
 {key : "i-23121",text:"NODE5",isGroup: false,type: "instance",category: "ofNodes", highlight: false , isHighlighted: false,footer: "M3.xlarge", group: "subnet112"},
  {key : "i-23212",text:"NODE6",isGroup: false,type: "instance",category: "ofNodes", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "subnet112"},
  {key : "i-23213",text:"NODE7",isGroup: false,type: "instance",category: "ofNodes", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "subnet113"},
  {key : "i-23214",text:"NODE8",isGroup: false,type: "instance",category: "ofNodes", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "subnet113"},
  {key : "subnet112",text:"MySubnet3 [subnet112] [10.3.0.0/24]",isGroup: true,type: "subnet",category: "OfGroups", highlight: false, isHighlighted: false,footer: "M3.xlarge", group: "vpc-2", zone: "public"},
  {key : "subnet113",text:"MySubnet4 [subnet113] [10.3.1.0/24]",isGroup: true,type: "subnet",category: "OfGroups", highlight: true, isHighlighted: false,footer: "M3.xlarge", group: "vpc-2", zone: "protected"},
  {key : "vpc-2",text:"vpc_10.3 [vpc343] [10.3.0.0/16]",isGroup: true,type: "vpc",category: "OfGroups", highlight: false,isHighlighted: false, footer: "M3.xlarge", group: "us-east-1"},
 {key : "S3",text:"S3",isGroup: false,type: "s3",category: "ofNodes", highlight: false, isHighlighted: false,footer: "S3", group: "AWSServices"},
  {key : "Kinesis",text:"Kinesis",isGroup: false,type: "kinesis",category: "ofNodes", highlight: false, isHighlighted: false,footer: "Kinesis", group: "AWSServices"},

 {key : "AWSServices",text:"AWS Platform Services",isGroup: true,type: "aws",category: "OfGroups", highlight: false, isHighlighted: false,footer: "AWSServices"},
  {key : "OnPrem",text:"On-Prem",isGroup: true,type: "onprem",category: "OfGroups", highlight: false, isHighlighted: false,footer: "On-Prem"},
  {key : "ONPREMNode1",text:"ON PREM Node1",isGroup: false,type: "onprem",category: "ofNodes", highlight: false, isHighlighted: false,footer: "ON PREM Node1", group:"OnPrem"},
  {key : "ONPREMNode2",text:"ON PREM Node2",isGroup: false,type: "onprem",category: "ofNodes", highlight: false, isHighlighted: false,footer: "ON PREM Node2", group:"OnPrem"},

  {key : "BlackList",text:"BlackListed",isGroup: true,type: "blacklist",category: "OfGroups", highlight: false, isHighlighted: false,footer: "On-Prem"},
  {key : "Node1",text:"Node1",isGroup: false,type: "blacklist",category: "ofNodes", highlight: false, isHighlighted: false,footer: "ON PREM Node1", group:"BlackList"},
  {key : "Node2",text:"Node2",isGroup: false,type: "blacklist",category: "ofNodes", highlight: false, isHighlighted: false,footer: "ON PREM Node2", group:"BlackList"},

  {key : "WhiteList",text:"WhiteListed",isGroup: true,type: "onprem",category: "OfGroups", highlight: false, isHighlighted: false,footer: "On-Prem"},
  {key : "Node1",text:"Node1",isGroup: false,type: "whitelist",category: "ofNodes", highlight: false, isHighlighted: false,footer: "ON PREM Node1", group:"WhiteList"},
  {key : "Node2",text:"Node2",isGroup: false,type: "whitelist",category: "ofNodes", highlight: false, isHighlighted: false,footer: "ON PREM Node2", group:"WhiteList"}



];
linkDataArray = [{from: "subnet123", to: "subnet113",labelKeys: ["subnet123-subnet113"],text: "1.2GB \n ports 22, 443" },{from:"subnet123",to:"subnet124", labelKeys: ["subnet123-subnet124"]},{from:"subnet112",to:"subnet124",color:"red",width:5, dash: [3,5]},
    {from:"i-23123",to:"subnet113"},{from:"i-23124",to:"subnet113"}, {from:"subnet113",to:"Internet"},{from:"jumphost1",to:"Internet"},{from:"igw1" , to:"Internet"},{from:"subnet123",to:"AWSServices",text: "1.2GB \n ports 22, 443"}
];
}

function filterNodes() {
    nodeDataArrayDisplayed = [];
    for (var j = 0; j < nodeDataArray.length; j++) {
        console.log(nodeDataArray[j].type);
       /* if (document.getElementById('hidesgcheckbox').checked && ((nodeDataArray[j].type == 'sg') || (nodeDataArray[j].type == 'sggroupbox'))) {} else if (document.getElementById('hidevolumes').checked && ((nodeDataArray[j].type == 'volume') || (nodeDataArray[j].type == 'volumeaz'))) {} else {
            nodeDataArrayDisplayed.push(nodeDataArray[j]);
        }*/
        if(!showsg && ((nodeDataArray[j].type == 'sg') || (nodeDataArray[j].type == 'sggroupbox'))){
            // Skip 'sg' types and 'sgbox' types

        }else if(!showvolumes && ((nodeDataArray[j].type == 'volume') || (nodeDataArray[j].type == 'volumeunattached'))){
        }
        else if(!showstoppedinstances && ((nodeDataArray[j].type == 'instancestopped'))){
                }
        else {
            nodeDataArrayDisplayed.push(nodeDataArray[j]);
        }

    }
    linkDataArrayDisplayed = [];
    for (var j = 0; j < linkDataArray.length; j++) {
        linkDataArrayDisplayed.push(linkDataArray[j]);
    }

   // Filter out empty subnets and availability zone boxes -- if hide empty boxes is checked
   if(hideemptyboxes){
       filteremptynodes(nodeDataArrayDisplayed);
   }

    //updatediagramtitle();

   // myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed, linkDataArrayDisplayed);
   //For testing links code
   links10maggr =  generatelinks(nodeDataArrayDisplayed);
   links10mgaggrts = generatelinkts(links10maggr.length);
   drawtimelinechart();
   upadteinforightdiv();updateregiondisplay();

   linksnapshotposition = links10maggr.length - 1;
   if(hidelinks){
       myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed,[]);

   }else{
    myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed,JSON.parse(links10maggr[linksnapshotposition]));

   }

   myDiagram.isEnabled = true;
   myDiagram.allowMove = false;
   myDiagram.allowCopy = false;
   myDiagram.allowInsert = false;
   myDiagram.allowDelete = false;

   // End testing links code
}


function previous(){
upadteinforightdiv();
    if(hidelinks){
       myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed,[]);
   }else{
    console.log(linksnapshotposition);
    if(linksnapshotposition > 0){
            linksnapshotposition = linksnapshotposition -1 ;
            myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed,JSON.parse(links10maggr[linksnapshotposition]));
    }
   }
}

function next(){
upadteinforightdiv();
    if(hidelinks){
       myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed,[]);
   }else{
    console.log(linksnapshotposition);
    if(linksnapshotposition < links10maggr.length-1){
                linksnapshotposition = linksnapshotposition + 1 ;
            myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed,JSON.parse(links10maggr[linksnapshotposition]));
    }
   }
}

var playbackid; var playid;
function playback(){
        if(playid){playid.clearInterval();}
       playbackid =  setInterval(function(){previous();drawtimelinechart()},animationspeed);
}

function play(){
    if(playbackid){playbackid.clearInterval();}
     playid =    setInterval(function(){next();drawtimelinechart()},animationspeed);
}

function getsnapshots(region,fromts,tots){
console.log('GETTING THE SNAPSHOTS ~~~~~~>' + '/getsnapshots/' + fromts + '/' + tots +'/'+region);
getJSON('/getsnapshots/' + fromts + '/' + tots +'/'+region, function(data) {
    snapshotsarray = data; console.log("# of snapshots = " + snapshotsarray.length); console.log(data);
    linkDataArray = [];
    snapshotindex = snapshotsarray.length -1 ;
    nodeDataArray = JSON.parse(JSON.parse(snapshotsarray[snapshotindex]).hierarchy);
    console.log(nodeDataArray.length);
    // Two caveats with collecting tags for visualization - 1) Tag key of 'Name' may need to be excluded ;;; this may equal to number of elements in your AWS account
    // 2) Tags CLI did not fetch all tags -- especially that related to services
    var taglist = JSON.parse(snapshotsarray[snapshotindex]).tags;
    for(var g in taglist){
        if(taglist[g].Key.toLowerCase() != 'name'){
            alltags.add(taglist[g].Key+"|"+taglist[g].Value);
        }
    }
    if(localStorage){
        var valuetostore = "";
        var alltagsarray = Array.from(alltags);
        for(var g in alltagsarray){
            if(g == 0){valuetostore = alltagsarray[g];}else{valuetostore = valuetostore + "00separator00" + alltagsarray[g];}
        }
        localStorage.setItem('alltags',valuetostore);
    }else{
        console.log('No Browser support for local storage');
    }

    // Diagnostics
    console.log("liza339"); var snapshotobj = JSON.parse(snapshotsarray[snapshotindex]);
    console.log(snapshotobj.s3);
    filterNodes();
});
}


function changeregion(){
swal({
  title: 'Change Region',
  input: 'select',
  inputOptions: regions,
  inputPlaceholder: 'Change Region',
  showCancelButton: true
}).then(function (result) {
    currregionindex = Number(result);
    region = regions[currregionindex]; updateregiondisplay();
    console.log('selected region -' + regions[currregionindex]);
    localStorage.setItem('defaultregionindex',currregionindex);
    getsnapshots(regions[currregionindex],fromts,tots);
})
}



function setdisplaylevel(){
swal({
  title: 'Hierarchy Level',
  type: 'question',
  input: 'range',
  inputAttributes: {
    min: 0,
    max: 5,
    step: 1
  },
  inputValue: hierarchylevel
}).then(function (result) {
     myDiagram.startTransaction("reexpand");
        hierarchylevel = result;
        myDiagram.findTopLevelGroups().each(function(g) {
            expandGroups(g, 0, result);
        })
        myDiagram.commitTransaction("reexpand");
  })
}

function choosetimerange(){
swal({
    title: 'Choose Start Time',width: '850px',
    html: "<div class=\"container\"><div class='col-md-5'><div class=\"form-group\">\<div class='input-group date' id='datetimepicker6'><input type='text' class=\"form-control\" /><span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-calendar\"></span></span></div></div></div><div class='col-md-5'><div class=\"form-group\"><div class='input-group date' id='datetimepicker7'><input type='text' class=\"form-control\" /><span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-calendar\"></span></span></div></div></div></div>",
     onOpen: function() {
    	   $('#datetimepicker6').datetimepicker();
                $('#datetimepicker7').datetimepicker({
                    useCurrent: false //Important! See issue #1075
                });
                $("#datetimepicker6").on("dp.change", function (e) {
                    $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
                });
                $("#datetimepicker7").on("dp.change", function (e) {
                    $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
                });
    }, preConfirm: function() {
            fromts = $("#datetimepicker6").data("DateTimePicker").date() ;
            tots = $("#datetimepicker7").data("DateTimePicker").date() ;
            return Promise.resolve(fromts + "|" + tots);
          }
  }).then(function(result) {
    console.log(result);
    getsnapshots(regions[currregionindex],fromts,tots);
    swal({
      type: 'success',
      html: '<strong>Time Range Set<br>' + moment(fromts).format("MM/DD/YYYY h:mm:ss") + " - " + moment(tots).format("MM/DD/YYYY h:mm:ss") + '</strong>'
    });
  });
}

function setanimationspeed(){
swal({
  title: 'Set Animation Speed [in ms]',
  type: 'info',
  input: 'range',
  inputAttributes: {
    min: 100,
    max: 3000,
    step: 100
  },
  inputValue: animationspeed
}).then(function(result) {
    console.log(typeof(result));
    animationspeed = Number(result);
    if(localStorage){
        localStorage.setItem("animationspeed",Number(result));
    }
});
}

function runsweep(){
getJSON('/gosnapshot', function(data) {
    console.log(data);
});
}

function changefilters(){

var innerhtml = "";
if(showsg){
   innerhtml = innerhtml + "<input type=\"checkbox\" onclick='showsgchanged(this)' id='showsgcb' checked>Show Security Groups<br>";
}else{
    innerhtml = innerhtml +  "<input type=\"checkbox\" onclick='showsgchanged(this)' id='showsgcb'>Show Security Groups<br>"
}

if(showvolumes){
    innerhtml = innerhtml +  "<input type=\"checkbox\" onclick='showvolumeschanged(this)' id='showvolumescb' checked>Show Volumes<br>";
}else{
    innerhtml = innerhtml +  "<input type=\"checkbox\" onclick='showvolumeschanged(this)' id='showvolumescb'>Show Volumes<br>"
}

if(showstoppedinstances){
    innerhtml = innerhtml + "<input type=\"checkbox\" onclick='showstoppedinstanceschanged(this)' id='showstoppedinstancescb' checked>Show Stopped Instances<br>";
}else{
    innerhtml = innerhtml + "<input type=\"checkbox\" onclick='showstoppedinstanceschanged(this)' id='showstoppedinstancescb'>Show Stopped Instances<br>";
}

if(hideemptyboxes){
    innerhtml = innerhtml + "<input type=\"checkbox\" onclick='hideemptyboxeschanged(this)' id='hideemptyboxescb' checked>Hide Empty Boxes<br>";
}else{
    innerhtml = innerhtml + "<input type=\"checkbox\" onclick='hideemptyboxeschanged(this)' id='hideemptyboxescb'>Hide Empty Boxes<br>";
}

if(hidelinks){
    innerhtml = innerhtml + "<input type=\"checkbox\" onclick='hidelinkschanged(this)' id='hidelinkscb' checked>Hide Links<br>";
}else{
    innerhtml = innerhtml + "<input type=\"checkbox\" onclick='hidelinkschanged(this)' id='hidelinkscb'>Hide Links<br>";
}

swal({
      title: "Filters",
      html: innerhtml,
      showCancelButton: true, showConfirmButton: true,
      width: '800px',
      showLoaderOnConfirm: true
    });
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


function bigImg(x) {
    x.style.height = "35px";
    x.style.width = "35px";
}

function normalImg(x) {
    x.style.height = "25px";
    x.style.width = "25px";
}

function nodeMouseLeave(e, obj) {
    console.log(obj.part.data.key);
    obj.part.data.category = 'mouseovertemplate';
}

function nodeMouseEnter(e, obj) {
    console.log(obj.part.data.key);
    obj.part.data.category = '';
}


function addannotation(resourceid,inputtext){

 var inputjson = {}; inputjson.userid = userid; inputjson.resourceid = resourceid; inputjson.comment = inputtext; inputjson.region = regions[currregionindex];

    var xhr = new XMLHttpRequest();
    var url = "/addAnnotation";
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

function makepostcall(url,inputjson,callback){ // callback(xhr.responseText) == your callback should be designed to accept the xhr response

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
           // console.log(xhr.responseText);
           callback(xhr.responseText);
        }
    }
    var data = JSON.stringify(inputjson);
    xhr.send(data);
}

function showannotationforresource(){
    swal('Will show the list of annotations in here for the appropriate resource');
}


function removeFunction (myObjects,prop,valu)
{
     return myObjects.filter(function (val) {
      return val[prop] !== valu;
  });

}

function filteremptynodes(){
 console.log("Will filter out all groups that are empty" + nodeDataArrayDisplayed.length);
        var allgroupids = [];
        var groupswithchild = new Set();
        var groupwithoutchild = new Set();
        for(var n in nodeDataArrayDisplayed){
                if(nodeDataArrayDisplayed[n].group){
                    groupswithchild.add(nodeDataArrayDisplayed[n].group);
                }
                if(nodeDataArrayDisplayed[n].isGroup){
                    allgroupids.push(nodeDataArrayDisplayed[n].key);
                }
        }
        var tmp = nodeDataArrayDisplayed;
        nodeDataArrayDisplayed = [];

        for(var g in allgroupids){
            if(!groupswithchild.has(allgroupids[g])){
                groupwithoutchild.add(allgroupids[g]);
            }
        }

        for(var s in tmp){
              if(!groupwithoutchild.has(tmp[s].key)){
                nodeDataArrayDisplayed.push(tmp[s]);
              }
        }

        console.log("After filtering " + nodeDataArrayDisplayed.length)
}

function updatediagramtitle(){
        // Diagram Title & Legend

        myDiagram.add(
            $(go.Part,
              {
                layerName: "Grid",  // must be in a Layer that is Layer.isTemporary,
                                    // to avoid being recorded by the UndoManager
                _viewPosition: new go.Point(0,0)  // some position in the viewport,
                                                   // not in document coordinates
              },
              $(go.TextBlock, "AWS Infra - " + regions[currregionindex], { font: "bold 10pt sans-serif", stroke: "green" })));

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


}


/*
  Functions below were created to generate links for testing .. You can use it to just test
*/

function generatelinks(data){
var linksnapshots = [];
for(var count = 0; count < getrandombetween1and40(); count++){
    var links = [];
    for(var j in data){
        for(var k in data){
            if(getrandombetween1and100()<25){
                var node = {};
                node.from = data[j].key; node.to = data[k].key; node.count = getrandombetween1and100(); node.color = 'red';
                if(node.from != node.to){
                    if((data[j].type == 'instance' || data[j].type == 'volume' || data[j].type == 'sg') && (data[k].type == 'instance' || data[k].type == 'volume' || data[k].type == 'sg')){ links.push(node);}
                }

            }
        }
    }
   linksnapshots.push(JSON.stringify(links));
}

    return linksnapshots;
}

function generatelinkts(num){
    var tsstart = new Date().getTime();
    var tslist = [];
    for(var i=0; i<num;i++){
        tslist.push(tsstart -  i*10 * 60* 1000);
    }

    reverse(tslist);
    return tslist;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getrandombetween1and100(){
    return getRandomInt(1,100);
}


function getrandombetween1and40(){
    return getRandomInt(1,3000);
}


function reverse(array) {
  var first = null;
  var last = null;
  var tmp = null;
  var length = array.length;

  for (first = 0, last = length - 1; first < length / 2; first++, last--) {
    tmp = array[first];
    array[first] = array[last];
    array[last] = tmp;
  }
}

function upadteinforightdiv(){
    document.getElementById('inforightdiv').innerHTML = "<h1 style='font-size:12px;color:blue'>" + moment(links10mgaggrts[linksnapshotposition]).format("MM/DD/YYYY h:mm:ss") + "</h1>";
}

function updateregiondisplay(){
    document.getElementById('infomiddlediv').innerHTML = "<h1 style='font-size:12px;color:blue'>" + regions[currregionindex] + "</h1>";
}


  function drawtimelinechart() {
    console.log('drawing google chart');
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'EventType');
      data.addColumn('datetime', 'Start');
      data.addColumn('datetime', 'End');
    // data.addColumn({role: 'annotation'}, 'ANIMATIONTIMESTAMP');
      var rows = [];

      for(var k in links10mgaggrts){
        rows.push(['Link Aggregation',new Date(links10mgaggrts[k]),new Date(links10mgaggrts[k]+100)]);
      }
      rows.push(['Current time',new Date(links10mgaggrts[linksnapshotposition]),new Date(links10mgaggrts[linksnapshotposition])]);
      data.addRows(rows);

      var options = {
        height: 200,
        timeline: {
          groupByRowLabel: true
        }
      };

       function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) { // selectedItem.row is the linksnapshot index
                    linksnapshotposition = selectedItem.row ;
                    console.log("~~~~~>"+links10maggr[linksnapshotposition]);
                        myDiagram.model = new go.GraphLinksModel(nodeDataArrayDisplayed,JSON.parse(links10maggr[linksnapshotposition]));

                }
              }


      var chart = new google.visualization.Timeline(document.getElementById('chart_div'));
            google.visualization.events.addListener(chart, 'select', selectHandler);

      chart.draw(data, options);



    }

    function googlechartselecthandler() {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          var value = data.getValue(selectedItem.row, selectedItem.column);
          alert('The user selected ' + value);
        }
      }



/*
  Functions above were created to generate links for testing .. You can use it to just test
*/

