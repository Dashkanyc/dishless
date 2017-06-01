var redis = require("redis");
var redisPort = process.env.redisport;
var redisHost = process.env.redishost;
var redisPassword = '';
var client = redis.createClient(redisPort, redisHost);
var rangeCheck = require('range_check');
var reservedIpRanges = ["0.0.0.0/8", "10.0.0.0/8", "100.64.0.0/10", "127.0.0.0/8", "169.254.0.0/16", "172.16.0.0/12", "192.0.0.0/24", "192.0.2.0/24", "192.88.99.0/24", "192.168.0.0/16", "198.18.0.0/15", "198.51.100.0/24", "203.0.113.0/24", "224.0.0.0/4", "203.0.113.0/24", "224.0.0.0/4", "240.0.0.0/4", "255.255.255.255/32"];
var latestts = 0;
var Map = require('collections/map');
var awsobjects =  new Map();

client.on("connect", function () {
    console.log("Successfully Connected to Redis");
});

client.on("error", function (err) {
    console.log("REDIS ERROR: " + err);
});


exports.setlatestts = function(val){
    latestts = val;
}

exports.getlatestts = function(){
    return latestts;
}

exports.setawsobj = function(key,val){
    awsobjects.set(key,val);
}

exports.getawsobj = function(key){
    awsobjects.get(key);
}

exports.redisClient = client;

exports.startsWith = function(s,starter) {
  for (var i = 0,cur_c; i < starter.length; i++) {
    cur_c = starter[i];
    if (s[i] !== starter[i]) {
      return false;
    }
  }
  return true;
}

//exports.awsregions = ['us-east-2'];

exports.awsregions = ['us-east-1','us-east-2','us-west-1','us-west-2','us-gov-west-1','eu-west-1','eu-central-1'];


exports.arrayContains = function (needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}


exports.isInReservedRange = function(ip) {
    for (var index in reservedIpRanges) {

        if (rangeCheck.inRange(ip, reservedIpRanges[index])) {
            return true;
        }

        if (index == reservedIpRanges.length - 1) {
            return false;
        }
    }
}

/*

entry.srcvpc = eniobj.vpc; entry.srcsubnet = eniobj.subnet; entry.srcasg = eniobj.asg; entry.srcentityname = eniobj.entityname; entry.srcentitytype = eniobj.entitytype;
                                entry.srcentitydetail = eniobj.entitydetail; entry.srcsgs = eniobj.sgs; entry.srcsgdetails = eniobj.sgdetails; entry.srctags = eniobj.tags; entry.srcpubip = eniobj.pubip; entry.srcpublicdns = eniobj.pubdns;


entry.dstvpc = othereniobj.vpc; entry.dstsubnet = othereniobj.subnet; entry.dstasg = othereniobj.asg; entry.dstentityname = othereniobj.entityname; entry.dstentitytype = othereniobj.entitytype;
 entry.dstentitydetail = othereniobj.entitydetail; entry.dstsgs = othereniobj.sgs; entry.dstsgdetails = othereniobj.sgdetails; entry.dsttags = othereniobj.tags; entry.dstpubip = othereniobj.pubip; entry.dstpublicdns = othereniobj.pubdns;

 entry.isplatformservice = 'YES'; entry.platformservice = item.service; entry.platformserviceregion = item.region;

entry.isreservedip = 'YES';

{ srcaddr: '10.0.0.79',
  dstport: '8080',
  start: '1485373201',
  dstaddr: '10.0.0.182',
  version: '2',
  packets: '4',
  protocol: '6',
  account_id: '445920161782',
  interface_id: 'eni-18e79af0',
  log_status: 'OK',
  bytes: '216',
  srcport: '61027',
  action: 'ACCEPT',
  end: '1485373258' }

*/

exports.elasticsearchmappings = {"flowlogs": {
                                                    "properties": {
                                                        "srcaddr": {
                                                            "type": "string"
                                                        },
                                                        "dstport": {
                                                            "type": "string"
                                                        },
                                                        "start": {
                                                            "type": "string"
                                                        },
                                                        "dstaddr": {
                                                            "type": "string"
                                                        },
                                                        "version": {
                                                            "type": "string"
                                                        },
                                                        "packets": {
                                                            "type": "string"
                                                        },
                                                        "protocol": {
                                                            "type": "string"
                                                        },
                                                        "account_id": {
                                                            "type": "string"
                                                        },
                                                        "interface_id": {
                                                            "type": "string"
                                                        },
                                                        "log_status": {
                                                            "type": "string"
                                                        },
                                                        "bytes": {
                                                            "type": "string"
                                                        },
                                                        "srcport": {
                                                            "type": "string"
                                                        },
                                                        "action": {
                                                            "type": "string"
                                                        },
                                                        "end": {
                                                            "type": "string"
                                                        },
                                                        "status": {
                                                            "type": "string"
                                                        },
                                                        "srcvpc": {
                                                            "type": "string"
                                                        },
                                                        "dstvpc": {
                                                            "type": "string"
                                                        },
                                                        "srcsubnet": {
                                                            "type": "string"
                                                        },
                                                        "dstsubnet": {
                                                            "type": "string"
                                                        },
                                                        "srcsgs": {
                                                            "type": "string"
                                                        },
                                                        "dstsgs": {
                                                            "type": "string"
                                                        },
                                                        "srcasg": {
                                                                   "type": "string"
                                                               },
                                                               "dstasg": {
                                                                   "type": "string"
                                                               },
                                                               "srcsgdetails": {
                                                                   "type": "string"
                                                               },
                                                               "dstsgdetails": {
                                                                   "type": "string"
                                                               },
                                                               "srcentityname": {
                                                                   "type": "string"
                                                               },
                                                               "dstentityname": {
                                                                   "type": "string"
                                                               },
                                                                "srcentitytype": {
                                                                   "type": "string"
                                                               },
                                                               "dstentitytype": {
                                                                   "type": "string"
                                                               },
                                                               "srcentitydetail": {
                                                                   "type": "string"
                                                               },
                                                               "dstentitydetail": {
                                                                   "type": "string"
                                                               },
                                                               "srctags": {
                                                                   "type": "string"
                                                               },
                                                               "dsttags": {
                                                                   "type": "string"
                                                               },
                                                                "srcpubip": {
                                                                   "type": "string"
                                                               },
                                                               "srcpublicdns": {
                                                                   "type": "string"
                                                               },
                                                               "dstpubip": {
                                                                   "type": "string"
                                                               },
                                                               "dstpublicdns": {
                                                                   "type": "string"
                                                               },
                                                               "isplatformservice": {
                                                                   "type": "string"
                                                               },
                                                               "platformservice": {
                                                                   "type": "string"
                                                               },
                                                               "platformserviceregion": {
                                                                   "type": "string"
                                                               },
                                                               "isreservedip": {
                                                                   "type": "string"
                                                               }
                                                    },
                                                    "_all": {
                                    "enabled": false
                                                    }
                                                }
                                            };


