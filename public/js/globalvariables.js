var objectmap = {}; // This will be used as hashmap  objectmap['instid'] = instancedetail
var nodedataarray = [];
var linkdataarray = [];
var timelist = [];
var snapshotindex = 0;
var displayedtime;
var nodedata;
var linkdata;
var links10maggr = []; // This is an array of strings and each string is a value of a key such as "10maggr|1487712919" ..
// Each string is an array of objects such as this - {to,from,count} - from and to will hold obj.data.key that is being displayed in graphs
var linksnapshotposition = links10maggr.length - 1; // JSON.parse(links10maggr[linksnapshotposition]) --> Array of {to,from,count}
var links10mgaggrts = []; // It is the timestamps of corresponding aggregates




var snapshots = [];
var currsnapshot;
var regions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2'];
var regionlocations = [{'lat':38.9586,'lon':-77.3570},{'lat':41.4993,'lon':-81.6944},{'lat':37.7749,'lon':-122.4194},{'lat':45.5231,'lon':-122.6765}];
var flowloglocations = [];
var currregionindex = 0;

// If there is default region settings then move the currregionindex to corresponding region
if(localStorage && localStorage.getItem('defaultregionindex')){
   currregionindex = localStorage.getItem('defaultregionindex');
}
var region = regions[currregionindex];
var apptag = 'app';
var cctag = 'cc';
var currapp = 'app1';
var currcc = 'cc1';
var nodemap = {}; // To see if node is there or not
var lanecolors = ['#00B5CB',"#F47321",'#C8DA2B','#888',"#F5F5F5"];
var hierarchylevel = 3;
var tots = (new Date()).getTime();// Get the last 24 hrs.. I need to redefine these from and to in the long run .. let me get back to that
var fromts = tots - 24 * 60 * 60 * 1000;
var userid = 'YETTOBEIMPLEMENTED';
// Tags Management Related
var selectedtags = new Set();//['env|Prod','env|Dev', 'env|SIT', 'cfnid|2342','cfnid|23455'];   // This will be an array of values such as 'TagType|TagValue'
var alltags = new Set();//['env|Prod|10','env|Dev|3', 'env|SIT|34', 'cfnid|2342|0','cfnid|23455|32','k1|v1|23','k1|v2|32']; // This will be an array of values such as this 'TagType|TagValue|Number'
if(localStorage){
    if(localStorage.getItem('selectedtags')){
        var storedval = localStorage.getItem('selectedtags');
        console.log('selected tags ' + storedval);
        var list = storedval.split("00separator00");
        for(var g in list){
            selectedtags.add(list[g]);
        }
    }else{
        console.log('~~~~~>no saved selected tags');
    }

    if(localStorage.getItem('alltags')){
                var storedval = localStorage.getItem('alltags');
                var list = storedval.split("00separator00");
                for(var p in list){
                    alltags.add(list[p]);
                }
    }else{
        console.log('~~~~~>no saved all tags');
    }
}

// End Tags


// Filter settings and defaults

var showsg = false;
var showvolumes = false;
var showstoppedinstances = false;
var hideemptyboxes = true;
var hidelinks = false;

// Above are the defaults but get it from localstorage if available
/*
if(localStorage && localStorage.getItem("showsg")){
    showsg = localStorage.getItem("showsg");
}

if(localStorage && localStorage.getItem("showvolumes")){
    showvolumes = localStorage.getItem("showvolumes");
}

if(localStorage && localStorage.getItem("showstoppedinstances")){
    showstoppedinstances = localStorage.getItem("showstoppedinstances");
}

if(localStorage && localStorage.getItem("hideemptyboxes")){
    hideemptyboxes = localStorage.getItem("hideemptyboxes");
}
*/

if(localStorage && localStorage.getItem("hidelinks")){
    hidelinks = localStorage.getItem("hidelinks");
}

var animationspeed = 1000;
if(localStorage && localStorage.getItem("animationspeed")){
    animationspeed = localStorage.getItem("animationspeed");
}

// End Filter settings

var appresourceswithtypes = [];
var appresources = [];
var appresourcetypes = [];

var bucketedconfigchanges = [];
var sweeptslist = [];
var hourlylinkaggtslist = [];

function resetglobalvariables(){
    objectmap = {}; // This will be used as hashmap  objectmap['instid'] = instancedetail
    nodedataarray = [];
    linkdataarray = [];
    timelist = [];
    snapshots = [];
}

function initglobalvariables(data){
    resetglobalvariables();
    snapshots = data;
    settimelist(data);
    updateobjectstoindex(0);
}

function settimelist(data){
   for(var m in data){
     timelist.push(JSON.parse(data[0]).currts);
   }
   console.log(timelist);
}

function updateobjectstoindex(newindex){
    snapshotindex = newindex;
    displayedtime = timelist[newindex];
    currsnapshot = JSON.parse(snapshots[newindex]);
    objectmap = {};
    objectmap["sgs"] = JSON.parse(currsnapshot.sgs);
    objectmap["instances"] = JSON.parse(currsnapshot.instances);
    objectmap["volumes"] = JSON.parse(currsnapshot.volumes);
    objectmap["sgs"] = JSON.parse(currsnapshot.sgs);
    objectmap["hierarchy"] =  JSON.parse(currsnapshot.hierarchy);
    objectmap["vpcs"] =  JSON.parse(currsnapshot.vpcs);
    objectmap["subnets"] =  JSON.parse(currsnapshot.subnets);
    objectmap["elbs"] =  JSON.parse(currsnapshot.elbs);

    // Do this for every object type

    for(var t in objectmap["instances"]){
        objectmap[objectmap["instances"][t].InstanceId] = objectmap["instances"][t];
    }

    for(var t in objectmap["sgs"]){
        objectmap[objectmap["sgs"][t].GroupId] = objectmap["sgs"][t];
    }

    for(var t in objectmap["volumes"]){
        objectmap[objectmap["volumes"][t].VolumeId] = objectmap["volumes"][t];
    }


    for(var t in objectmap["vpcs"]){
        objectmap[objectmap["vpcs"][t].VpcId] = objectmap["vpcs"][t];
    }


    for(var t in objectmap["subnets"]){
        objectmap[objectmap["subnets"][t].SubnetId] = objectmap["subnets"][t];
    }

    for(var t in objectmap["elbs"]){
        objectmap[objectmap["elbs"][t].LoadBalancerId] = objectmap["elbs"][t];
    }


}


// Link animations for a single 10maggrc-- In sorted order of 'start'

var elslinksforatimeperiod = []; /* array like this {
                                                    "srcaddr":"172.31.26.196",
                                                    "dstport":33635,
                                                    "start":1487025137,
                                                    "dstaddr":"52.13.127.121",
                                                    "version":"2",
                                                    "packets":"7",
                                                    "protocol":"6",
                                                    "account_id":"445920161782",
                                                    "interface_id":"eni-eea3d095",
                                                    "log_status":"OK",
                                                    "bytes":"420",
                                                    "srcport":8080,
                                                    "action":"REJECT",
                                                    "end":1487025257,
                                                    "currts":1487260011,
                                                    "isoriginating":"NO",
                                                    "srcvpc":"vpc-3822e851",
                                                    "srcsubnet":"subnet-73b54008",
                                                    "srcasg":"MY-ASG-1",
                                                    "srcentitytype":"EC2",
                                                    "srcentitydetail":"{\"InstanceId\":\"i-05f11ed627e06ea17\",\"ImageId\":\"ami-c55673a0\",\"State\":{\"Code\":16,\"Name\":\"running\"},\"PrivateDnsName\":\"ip-172-31-26-196.us-east-2.compute.internal\",\"PublicDnsName\":\"ec2-52-14-83-96.us-east-2.compute.amazonaws.com\",\"StateTransitionReason\":\"\",\"KeyName\":\"cliq1\",\"AmiLaunchIndex\":0,\"ProductCodes\":[],\"InstanceType\":\"t2.nano\",\"LaunchTime\":\"2017-02-12T16:26:37.000Z\",\"Placement\":{\"AvailabilityZone\":\"us-east-2b\",\"GroupName\":\"\",\"Tenancy\":\"default\"},\"Monitoring\":{\"State\":\"disabled\"},\"SubnetId\":\"subnet-73b54008\",\"VpcId\":\"vpc-3822e851\",\"PrivateIpAddress\":\"172.31.26.196\",\"PublicIpAddress\":\"52.14.83.96\",\"Architecture\":\"x86_64\",\"RootDeviceType\":\"ebs\",\"RootDeviceName\":\"/dev/xvda\",\"BlockDeviceMappings\":[{\"DeviceName\":\"/dev/xvda\",\"Ebs\":{\"VolumeId\":\"vol-0c253e52e24cb059b\",\"Status\":\"attached\",\"AttachTime\":\"2017-02-12T16:26:37.000Z\",\"DeleteOnTermination\":true}}],\"VirtualizationType\":\"hvm\",\"ClientToken\":\"6fde74ce-2b5f-4666-aaf1-115240b06afc_subnet-73b54008_1\",\"Tags\":[{\"Key\":\"app\",\"Value\":\"app1\"},{\"Key\":\"aws:autoscaling:groupName\",\"Value\":\"MY-ASG-1\"},{\"Key\":\"cc\",\"Value\":\"cc1\"}],\"SecurityGroups\":[{\"GroupName\":\"SSHANDHTTP\",\"GroupId\":\"sg-fabb0d93\"}],\"SourceDestCheck\":true,\"Hypervisor\":\"xen\",\"NetworkInterfaces\":[{\"NetworkInterfaceId\":\"eni-eea3d095\",\"SubnetId\":\"subnet-73b54008\",\"VpcId\":\"vpc-3822e851\",\"Description\":\"\",\"OwnerId\":\"445920161782\",\"Status\":\"in-use\",\"MacAddress\":\"06:41:a5:b1:42:a1\",\"PrivateIpAddress\":\"172.31.26.196\",\"PrivateDnsName\":\"ip-172-31-26-196.us-east-2.compute.internal\",\"SourceDestCheck\":true,\"Groups\":[{\"GroupName\":\"SSHANDHTTP\",\"GroupId\":\"sg-fabb0d93\"}],\"Attachment\":{\"AttachmentId\":\"eni-attach-eb52b385\",\"DeviceIndex\":0,\"Status\":\"attached\",\"AttachTime\":\"2017-02-12T16:26:37.000Z\",\"DeleteOnTermination\":true},\"Association\":{\"PublicIp\":\"52.14.83.96\",\"PublicDnsName\":\"ec2-52-14-83-96.us-east-2.compute.amazonaws.com\",\"IpOwnerId\":\"amazon\"},\"PrivateIpAddresses\":[{\"PrivateIpAddress\":\"172.31.26.196\",\"PrivateDnsName\":\"ip-172-31-26-196.us-east-2.compute.internal\",\"Primary\":true,\"Association\":{\"PublicIp\":\"52.14.83.96\",\"PublicDnsName\":\"ec2-52-14-83-96.us-east-2.compute.amazonaws.com\",\"IpOwnerId\":\"amazon\"}}],\"Ipv6Addresses\":[]}],\"IamInstanceProfile\":{\"Arn\":\"arn:aws:iam::445920161782:instance-profile/s3access\",\"Id\":\"AIPAI4GF4RP5YPVS42LOK\"},\"EbsOptimized\":false,\"EnaSupport\":true}",
                                                    "srcsgs":"[{\"GroupName\":\"SSHANDHTTP\",\"GroupId\":\"sg-fabb0d93\"}]",
                                                    "srcsgdetails":[
                                                    "{\"OwnerId\":\"445920161782\",\"GroupName\":\"SSHANDHTTP\",\"GroupId\":\"sg-fabb0d93\",\"Description\":\"AutoScaling-Security-Group-1 (2017-01-12 16:42:14.176-05:00)\",\"IpPermissions\":[{\"IpProtocol\":\"tcp\",\"FromPort\":80,\"ToPort\":80,\"UserIdGroupPairs\":[],\"IpRanges\":[{\"CidrIp\":\"0.0.0.0/0\"}],\"Ipv6Ranges\":[],\"PrefixListIds\":[]},{\"IpProtocol\":\"tcp\",\"FromPort\":22,\"ToPort\":22,\"UserIdGroupPairs\":[],\"IpRanges\":[{\"CidrIp\":\"0.0.0.0/0\"}],\"Ipv6Ranges\":[],\"PrefixListIds\":[]}],\"IpPermissionsEgress\":[{\"IpProtocol\":\"-1\",\"UserIdGroupPairs\":[],\"IpRanges\":[{\"CidrIp\":\"0.0.0.0/0\"}],\"Ipv6Ranges\":[],\"PrefixListIds\":[]}],\"VpcId\":\"vpc-3822e851\",\"Tags\":[{\"Key\":\"Name\",\"Value\":\"SSHANDHTTPSG\"}]}"
                                                    ],
                                                    "srctags":"[{\"Key\":\"app\",\"Value\":\"app1\"},{\"Key\":\"aws:autoscaling:groupName\",\"Value\":\"MY-ASG-1\"},{\"Key\":\"cc\",\"Value\":\"cc1\"}]",
                                                    "srcubip":"52.14.83.96",
                                                    "srcpublicdns":"ec2-52-14-83-96.us-east-2.compute.amazonaws.com",
                                                    "srcid":"i00dash0005f11ed627e06ea17",
                                                    "srcapp":"app1",
                                                    "srccc":"cc1",
                                                    "isplatformservice":"YES",
                                                    "platformservice":"EC2",
                                                    "platformserviceregion":"us-west-2",
                                                    "dstaddrandid":"52.13.127.12100separator00EC200separator00us00dash00west00dash002"
                                                    }
*/

var maplace; // This is the map object