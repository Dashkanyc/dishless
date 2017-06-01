exports.apptag = process.env.TAGFORAPPNAME || 'app'
exports.cctag = process.env.TAGFORCC || 'cc'
exports.keyid = process.env.keyid;
exports.accesskey = process.env.accesskey;
//exports.regions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2'];
exports.regions = ['us-east-1'];
exports.flowlogkeysexpiry = 3600 // 1 hr
exports.flowloglinksrediscacheexpiry = 3600 * 24 * 30; // 1 month
exports.elshost = process.env.elshost;
exports.elsport = process.env.elsport;
exports.awsipjsonurl = "https://ip-ranges.amazonaws.com/ip-ranges.json";
exports.configchangesgroupinginterval = process.env.configchangesgroupinginterval || 5 * 60 * 1000 ; // If chnages are within 5 mts slots they will be grouped
exports.awsipjson = {
    "syncToken": "1486592529",
    "createDate": "2017-02-08-22-22-09",
    "prefixes": [{
            "ip_prefix": "13.32.0.0/15",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "13.54.0.0/15",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "13.56.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "13.112.0.0/14",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "13.124.0.0/16",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "23.20.0.0/14",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "27.0.0.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "34.192.0.0/12",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "34.208.0.0/12",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "34.224.0.0/12",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "34.248.0.0/13",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "35.154.0.0/16",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "35.156.0.0/14",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "35.160.0.0/13",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "35.176.0.0/15",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "43.250.192.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "43.250.193.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.51.128.0/18",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.51.192.0/20",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.51.216.0/21",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.51.224.0/19",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.137.0.0/17",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.137.128.0/18",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.137.192.0/19",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "46.137.224.0/19",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "50.16.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "50.18.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "50.19.0.0/16",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "50.112.0.0/16",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.0.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.2.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.4.0.0/14",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.8.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.9.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.10.0.0/15",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.12.0.0/15",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.14.0.0/16",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.15.0.0/16",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.16.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.18.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.20.0.0/14",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.24.0.0/14",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.28.0.0/16",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.29.0.0/16",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.30.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.32.0.0/14",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.36.0.0/14",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.40.0.0/14",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.44.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.46.0.0/18",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.48.0.0/14",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.52.0.0/15",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.54.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.56.0.0/16",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.57.0.0/16",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.58.0.0/15",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.60.0.0/16",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.62.0.0/15",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.64.0.0/17",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.64.128.0/17",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.65.0.0/16",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.66.0.0/16",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.67.0.0/16",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.68.0.0/15",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.70.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.72.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.74.0.0/16",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.76.0.0/17",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.76.128.0/17",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.77.0.0/16",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.78.0.0/16",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.79.0.0/16",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.80.0.0/16",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.84.0.0/15",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.86.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.88.0.0/15",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.90.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.0.0/20",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.16.0/20",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.32.0/22",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.39.0/24",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.40.0/21",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.48.0/22",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.52.0/22",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.56.0/22",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.60.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.64.0/22",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.68.0/22",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.72.0/22",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.76.0/22",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.80.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.84.0/22",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.88.0/22",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.248.0/22",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.92.252.0/22",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.0.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.1.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.2.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.3.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.4.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.5.0/24",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.8.0/22",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.12.0/22",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.93.16.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.0.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.4.0/24",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.5.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.6.0/24",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.7.0/24",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.8.0/24",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.9.0/24",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.10.0/24",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.11.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.12.0/24",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.13.0/24",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.14.0/24",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.15.0/24",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.17.0/24",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.24.0/23",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.26.0/23",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.28.0/23",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.30.0/23",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.32.0/20",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.48.0/20",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.64.0/22",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.80.0/20",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.96.0/20",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.112.0/22",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.192.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.196.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.197.0/24",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.0/28",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.16/28",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.32/28",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.48/28",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.64/28",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.80/28",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.96/28",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.112/28",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.128/28",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.198.144/28",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.199.0/24",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.200.0/24",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.204.0/23",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.206.0/23",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.208.0/21",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.216.0/21",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.224.0/20",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.240.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.244.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.0/28",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.16/28",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.32/28",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.48/28",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.64/28",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.80/28",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.96/28",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.112/28",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.128/28",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.144/28",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.160/28",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.176/28",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.192/28",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.208/28",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.248.224/28",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.249.0/28",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.252.0/23",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.94.254.0/23",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.0.0/20",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.16.0/21",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.24.0/22",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.28.0/24",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.30.0/23",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.34.0/24",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.35.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.36.0/22",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.40.0/24",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.48.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.52.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.56.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.60.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.61.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.62.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.63.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.64.0/20",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.80.0/20",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.96.0/22",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.100.0/22",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.104.0/22",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.110.0/24",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.112.0/20",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.128.0/21",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.136.0/23",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.138.0/24",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.142.0/23",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.144.0/24",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.145.0/24",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.146.0/23",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.148.0/23",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.150.0/24",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.192.0/20",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.212.0/22",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.240.0/24",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.241.0/24",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.242.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.243.0/24",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.244.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.245.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.246.0/24",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.247.0/24",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.248.0/24",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.249.0/24",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.250.0/24",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.251.0/24",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.252.0/24",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.253.0/24",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.0/28",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.16/28",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.32/28",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.48/28",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.64/28",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.80/28",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.96/28",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.112/28",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.128/28",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.95.255.144/28",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.119.208.0/23",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.119.216.0/21",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.119.224.0/21",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.119.232.0/21",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.192.0.0/15",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.196.0.0/14",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.200.0.0/13",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.208.0.0/13",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.216.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.218.0.0/17",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.218.128.0/17",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.0.0/20",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.16.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.20.0/22",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.24.0/21",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.32.0/21",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.40.0/22",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.44.0/22",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.56.0/22",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.60.0/23",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.62.0/23",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.64.0/22",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.68.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.72.0/22",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.76.0/22",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.219.80.0/20",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.220.0.0/15",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.222.0.0/17",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "52.222.128.0/17",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.64.0.0/15",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.66.0.0/16",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.67.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.68.0.0/14",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.72.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.74.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.76.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.78.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.79.0.0/16",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.80.0.0/13",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.88.0.0/14",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.92.0.0/17",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.92.128.0/17",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.93.0.0/16",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.94.0.0/16",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.95.0.0/16",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.144.0.0/14",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.148.0.0/15",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.150.0.0/16",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.151.0.0/17",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.151.128.0/17",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.152.0.0/16",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.153.0.0/17",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.153.128.0/17",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.154.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.155.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.156.0.0/14",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.160.0.0/13",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.168.0.0/16",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.169.0.0/16",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.170.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.172.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.174.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.176.0.0/15",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.178.0.0/16",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.179.0.0/16",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.182.0.0/16",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.183.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.184.0.0/13",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.192.0.0/16",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.193.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.194.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.196.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.198.0.0/16",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.199.0.0/16",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.200.0.0/15",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.202.0.0/15",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.204.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.206.0.0/16",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.207.0.0/16",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.208.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.210.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.212.0.0/15",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.214.0.0/16",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.215.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.216.0.0/15",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.218.0.0/16",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.219.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.220.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.221.0.0/16",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.222.0.0/19",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.222.57.0/24",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.222.58.0/28",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.222.128.0/17",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.223.0.0/16",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.224.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.226.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.228.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.229.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.230.0.0/16",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.0.0/17",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.128.0/19",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.160.0/19",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.192.0/20",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.224.0/21",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.232.0/21",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.240.0/22",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.244.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.248.0/22",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.252.0/24",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.231.253.0/24",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.232.0.0/16",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.233.0.0/18",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.233.64.0/18",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.233.128.0/17",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.234.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.236.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.238.0.0/16",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.2.0/23",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.4.0/22",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.8.0/21",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.16.0/20",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.32.0/21",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.48.0/22",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.52.0/23",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.54.0/23",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.56.0/21",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.64.0/21",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.96.0/24",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.98.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.99.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.100.0/23",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.104.0/23",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.108.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.114.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.116.0/22",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.120.0/21",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.128.0/18",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.239.192.0/19",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.128.0/18",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.192.0/22",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.196.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.197.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.198.0/24",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.199.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.200.0/24",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.202.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.203.0/24",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.204.0/22",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.208.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.212.0/22",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.216.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.220.0/22",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.225.0/24",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.226.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.227.0/24",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.228.0/23",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.230.0/23",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.232.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.236.0/22",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.240.0/24",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.244.0/22",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.240.248.0/21",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.241.0.0/16",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.242.0.0/15",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.244.0.0/16",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.245.0.0/16",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.246.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.247.0.0/16",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.248.0.0/15",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.250.0.0/16",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.251.0.0/16",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.252.0.0/16",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.253.0.0/16",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.254.0.0/16",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "54.255.0.0/16",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "67.202.0.0/18",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "72.21.192.0/19",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "72.44.32.0/19",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "75.101.128.0/17",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "79.125.0.0/17",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "87.238.80.0/21",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "96.127.0.0/17",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "103.4.8.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "103.4.12.0/22",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "103.8.172.0/22",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "103.246.148.0/23",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "103.246.150.0/23",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "107.20.0.0/14",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "122.248.192.0/18",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "172.96.97.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "174.129.0.0/16",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "175.41.128.0/18",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "175.41.192.0/18",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.32.64.0/19",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.32.96.0/21",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.32.104.0/21",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.32.112.0/21",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.32.120.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.32.125.0/25",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.34.0.0/19",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.34.32.0/19",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.34.64.0/18",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "176.34.128.0/17",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "177.71.128.0/17",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "177.72.240.0/21",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "178.236.0.0/20",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "184.72.0.0/18",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "184.72.64.0/18",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "184.72.128.0/17",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "184.73.0.0/16",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "184.169.128.0/17",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "185.48.120.0/22",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "185.143.16.0/24",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "203.83.220.0/22",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "204.236.128.0/18",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "204.236.192.0/18",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "204.246.160.0/22",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "204.246.164.0/22",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "204.246.168.0/22",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "204.246.174.0/23",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "204.246.176.0/20",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.192.0/19",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.224.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.228.0/22",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.232.0/22",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.236.0/22",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.240.0/22",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.244.0/23",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.247.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.248.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.249.0/24",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.250.0/23",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.252.0/23",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.254.0/24",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "205.251.255.0/24",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "207.171.160.0/20",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "207.171.176.0/20",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "216.137.32.0/19",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "216.182.224.0/20",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ip_prefix": "13.54.0.0/15",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "13.56.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "13.112.0.0/14",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "13.124.0.0/16",
            "region": "ap-northeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "23.20.0.0/14",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "34.192.0.0/12",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "34.208.0.0/12",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "34.224.0.0/12",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "34.248.0.0/13",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "35.154.0.0/16",
            "region": "ap-south-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "35.156.0.0/14",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "35.160.0.0/13",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "35.176.0.0/15",
            "region": "eu-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.51.128.0/18",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.51.192.0/20",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.51.216.0/21",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.51.224.0/19",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.137.0.0/17",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.137.128.0/18",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.137.192.0/19",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "46.137.224.0/19",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "50.16.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "50.18.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "50.19.0.0/16",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "50.112.0.0/16",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.0.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.2.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.4.0.0/14",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.8.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.9.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.10.0.0/15",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.12.0.0/15",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.14.0.0/16",
            "region": "us-east-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.15.0.0/16",
            "region": "us-east-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.16.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.18.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.20.0.0/14",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.24.0.0/14",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.28.0.0/16",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.29.0.0/16",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.30.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.32.0.0/14",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.36.0.0/14",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.40.0.0/14",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.44.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.48.0.0/14",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.52.0.0/15",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.54.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.56.0.0/16",
            "region": "eu-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.57.0.0/16",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.58.0.0/15",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.60.0.0/16",
            "region": "ca-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.62.0.0/15",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.64.0.0/17",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.64.128.0/17",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.65.0.0/16",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.66.0.0/16",
            "region": "ap-south-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.67.0.0/16",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.68.0.0/15",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.70.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.72.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.74.0.0/16",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.76.0.0/17",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.76.128.0/17",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.77.0.0/16",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.78.0.0/16",
            "region": "ap-northeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.79.0.0/16",
            "region": "ap-northeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.80.0.0/16",
            "region": "cn-north-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.86.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.88.0.0/15",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.90.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.240.0/24",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.241.0/24",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.242.0/24",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.243.0/24",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.244.0/24",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.245.0/24",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.246.0/24",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.247.0/24",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.248.0/24",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.249.0/24",
            "region": "ap-south-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.250.0/24",
            "region": "ca-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.251.0/24",
            "region": "us-east-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.252.0/24",
            "region": "ap-northeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.253.0/24",
            "region": "eu-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.0/28",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.16/28",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.32/28",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.48/28",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.64/28",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.80/28",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.96/28",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.112/28",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.128/28",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.255.144/28",
            "region": "cn-north-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.192.0.0/15",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.196.0.0/14",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.200.0.0/13",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.208.0.0/13",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.220.0.0/15",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.222.0.0/17",
            "region": "us-gov-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.64.0.0/15",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.66.0.0/16",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.67.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.68.0.0/14",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.72.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.74.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.76.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.78.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.79.0.0/16",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.80.0.0/13",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.88.0.0/14",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.92.0.0/17",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.92.128.0/17",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.93.0.0/16",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.94.0.0/16",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.95.0.0/16",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.144.0.0/14",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.148.0.0/15",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.150.0.0/16",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.151.0.0/17",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.151.128.0/17",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.152.0.0/16",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.153.0.0/17",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.153.128.0/17",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.154.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.155.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.156.0.0/14",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.160.0.0/13",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.168.0.0/16",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.169.0.0/16",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.170.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.172.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.174.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.176.0.0/15",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.178.0.0/16",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.179.0.0/16",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.183.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.184.0.0/13",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.193.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.194.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.196.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.198.0.0/16",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.199.0.0/16",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.200.0.0/15",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.202.0.0/15",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.204.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.206.0.0/16",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.207.0.0/16",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.208.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.210.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.212.0.0/15",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.214.0.0/16",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.215.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.216.0.0/15",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.218.0.0/16",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.219.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.220.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.221.0.0/16",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.222.128.0/17",
            "region": "cn-north-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.223.0.0/16",
            "region": "cn-north-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.224.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.226.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.228.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.229.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.232.0.0/16",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.233.0.0/18",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.233.64.0/18",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.233.128.0/17",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.234.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.236.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.238.0.0/16",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.241.0.0/16",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.242.0.0/15",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.244.0.0/16",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.245.0.0/16",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.246.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.247.0.0/16",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.248.0.0/15",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.250.0.0/16",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.251.0.0/16",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.252.0.0/16",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.253.0.0/16",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.254.0.0/16",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "54.255.0.0/16",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "67.202.0.0/18",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "72.44.32.0/19",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "75.101.128.0/17",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "79.125.0.0/17",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "96.127.0.0/17",
            "region": "us-gov-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "103.4.8.0/22",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "103.4.12.0/22",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "107.20.0.0/14",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "122.248.192.0/18",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "174.129.0.0/16",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "175.41.128.0/18",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "175.41.192.0/18",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "176.32.64.0/19",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "176.34.0.0/19",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "176.34.32.0/19",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "176.34.64.0/18",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "176.34.128.0/17",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "177.71.128.0/17",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "184.72.0.0/18",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "184.72.64.0/18",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "184.72.128.0/17",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "184.73.0.0/16",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "184.169.128.0/17",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "185.48.120.0/22",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "204.236.128.0/18",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "204.236.192.0/18",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "216.182.224.0/20",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ip_prefix": "52.95.110.0/24",
            "region": "GLOBAL",
            "service": "ROUTE53"
        },
        {
            "ip_prefix": "205.251.192.0/21",
            "region": "GLOBAL",
            "service": "ROUTE53"
        },
        {
            "ip_prefix": "54.183.255.128/26",
            "region": "us-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.228.16.0/26",
            "region": "eu-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.232.40.64/26",
            "region": "sa-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.241.32.64/26",
            "region": "us-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.243.31.192/26",
            "region": "us-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.244.52.192/26",
            "region": "us-west-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.245.168.0/26",
            "region": "us-west-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.248.220.0/26",
            "region": "ap-northeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.250.253.192/26",
            "region": "ap-northeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.251.31.128/26",
            "region": "ap-southeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.252.79.128/26",
            "region": "ap-southeast-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.252.254.192/26",
            "region": "ap-southeast-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "54.255.254.192/26",
            "region": "ap-southeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "107.23.255.0/26",
            "region": "us-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "176.34.159.192/26",
            "region": "eu-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "177.71.207.128/26",
            "region": "sa-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ip_prefix": "13.32.0.0/15",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "13.54.63.128/26",
            "region": "ap-southeast-2",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "34.195.252.0/24",
            "region": "us-east-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "35.162.63.192/26",
            "region": "us-west-2",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.15.127.128/26",
            "region": "us-east-2",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.46.0.0/18",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.52.191.128/26",
            "region": "us-west-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.56.127.0/25",
            "region": "eu-west-2",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.57.254.0/24",
            "region": "eu-central-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.66.194.128/26",
            "region": "ap-south-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.78.247.128/26",
            "region": "ap-northeast-2",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.84.0.0/15",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.199.127.192/26",
            "region": "ap-northeast-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.212.248.0/26",
            "region": "eu-west-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.220.191.0/26",
            "region": "ap-southeast-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "52.222.128.0/17",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "54.182.0.0/16",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "54.192.0.0/16",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "54.230.0.0/16",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "54.233.255.128/26",
            "region": "sa-east-1",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "54.239.128.0/18",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "54.239.192.0/19",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "54.240.128.0/18",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "204.246.164.0/22",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "204.246.168.0/22",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "204.246.174.0/23",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "204.246.176.0/20",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "205.251.192.0/19",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "205.251.249.0/24",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "205.251.250.0/23",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "205.251.252.0/23",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "205.251.254.0/24",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        },
        {
            "ip_prefix": "216.137.32.0/19",
            "region": "GLOBAL",
            "service": "CLOUDFRONT"
        }
    ],
    "ipv6_prefixes": [{
            "ipv6_prefix": "2400:6500:0:7000::/56",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6500:0:7100::/56",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6500:0:7200::/56",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6500:0:7400::/56",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6500:0:7500::/56",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6500:100:7100::/56",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6500:ff00::/64",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6700:ff00::/64",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2403:b300:ff00::/64",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da00:2000::/40",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da00:4000::/40",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da00:8000::/40",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da00:a000::/40",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da00:c000::/40",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da00:ff00::/64",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da12::/36",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da14::/36",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da18::/36",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da1a::/36",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:da1c::/36",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:2040::/44",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:2080::/44",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:20c0::/44",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:4020::/44",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:4040::/44",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:4060::/44",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:4080::/44",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:40a0::/44",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:40c0::/44",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:8020::/44",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:8080::/44",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:80c0::/44",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:a040::/44",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:a080::/44",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:a0c0::/44",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:c020::/44",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:c040::/44",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:c080::/44",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:daa0:c0c0::/44",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:dafc:2000::/40",
            "region": "ap-northeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:dafc:4000::/40",
            "region": "ap-northeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:dafc:8000::/40",
            "region": "ap-southeast-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:dafc:a000::/40",
            "region": "ap-south-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2406:dafc:c000::/40",
            "region": "ap-southeast-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "240f:8000:8000::/40",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "240f:8018::/36",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "240f:80a0:8020::/44",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "240f:80a0:8040::/44",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "240f:80a0:8080::/44",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "240f:80a0:80c0::/44",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "240f:80fc:8000::/40",
            "region": "cn-north-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f00:1000::/40",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f00:2000::/40",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f00:4000::/40",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f00:6000::/40",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f00:8000::/40",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f00:c000::/40",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f00:e000::/40",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f11::/36",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f12::/36",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f14::/35",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f16::/36",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f18::/33",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f1c::/36",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1f1e::/36",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:1040::/44",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:1080::/44",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:10c0::/44",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:2040::/44",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:2080::/44",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:20c0::/44",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:4040::/44",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:4080::/44",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:40c0::/44",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:6040::/44",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:6080::/44",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:60c0::/44",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:8010::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:8020::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:8040::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:8060::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:8080::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:8090::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:80a0::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:80c0::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:80e0::/44",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:c020::/44",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:c040::/44",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:c0c0::/44",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:e020::/44",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:e040::/44",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:e080::/44",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1fa0:e0c0::/44",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1ffc:1000::/40",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1ffc:2000::/40",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1ffc:4000::/40",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1ffc:6000::/40",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1ffc:8000::/40",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1ffc:c000::/40",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:1ffc:e000::/40",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2600:9000::/28",
            "region": "GLOBAL",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:300f::/64",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:4000:5::/64",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:4000:7000::/56",
            "region": "us-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:4000:7100::/56",
            "region": "us-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:4000:7200::/56",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:4000:7400::/56",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:4000:7700::/56",
            "region": "us-east-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:107:4000:7800::/56",
            "region": "ca-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:108:7000::/44",
            "region": "us-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2620:108:d000::/44",
            "region": "us-gov-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2804:800:0:7000::/56",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2804:800:ff00::/64",
            "region": "sa-east-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a01:578:0:7000::/56",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a01:578:0:7100::/56",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a01:578:0:7200::/56",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a01:578:3::/64",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a01:578:13::/64",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d000:4000::/40",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d000:8000::/40",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d000:c000::/40",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d014::/36",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d018::/36",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d01c::/36",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:4040::/44",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:4080::/44",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:40c0::/44",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:8010::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:8020::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:8040::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:8080::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:8090::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:80a0::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:80c0::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:80e0::/44",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:c040::/44",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:c080::/44",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d050:c0c0::/44",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d07c:4000::/40",
            "region": "eu-central-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d07c:8000::/40",
            "region": "eu-west-1",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2a05:d07c:c000::/40",
            "region": "eu-west-2",
            "service": "AMAZON"
        },
        {
            "ipv6_prefix": "2400:6500:ff00::/64",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2400:6700:ff00::/64",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2403:b300:ff00::/64",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da00:2000::/40",
            "region": "ap-northeast-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da00:4000::/40",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da00:8000::/40",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da00:a000::/40",
            "region": "ap-south-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da00:c000::/40",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da00:ff00::/64",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da12::/36",
            "region": "ap-northeast-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da14::/36",
            "region": "ap-northeast-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da18::/36",
            "region": "ap-southeast-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da1a::/36",
            "region": "ap-south-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2406:da1c::/36",
            "region": "ap-southeast-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "240f:8000:8000::/40",
            "region": "cn-north-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "240f:8018::/36",
            "region": "cn-north-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f00:1000::/40",
            "region": "ca-central-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f00:2000::/40",
            "region": "us-gov-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f00:4000::/40",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f00:6000::/40",
            "region": "us-east-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f00:8000::/40",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f00:c000::/40",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f00:e000::/40",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f11::/36",
            "region": "ca-central-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f12::/36",
            "region": "us-gov-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f14::/35",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f16::/36",
            "region": "us-east-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f18::/33",
            "region": "us-east-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f1c::/36",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2600:1f1e::/36",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2620:107:300f::/64",
            "region": "us-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2620:108:700f::/64",
            "region": "us-west-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2620:108:d00f::/64",
            "region": "us-gov-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2804:800:ff00::/64",
            "region": "sa-east-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a01:578:3::/64",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a01:578:13::/64",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a05:d000:4000::/40",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a05:d000:8000::/40",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a05:d000:c000::/40",
            "region": "eu-west-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a05:d014::/36",
            "region": "eu-central-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a05:d018::/36",
            "region": "eu-west-1",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2a05:d01c::/36",
            "region": "eu-west-2",
            "service": "EC2"
        },
        {
            "ipv6_prefix": "2400:6500:ff00::36fb:1f80/122",
            "region": "ap-southeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2400:6500:ff00::36ff:fec0/122",
            "region": "ap-southeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2400:6700:ff00::36f8:dc00/122",
            "region": "ap-northeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2400:6700:ff00::36fa:fdc0/122",
            "region": "ap-northeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2403:b300:ff00::36fc:4f80/122",
            "region": "ap-southeast-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2403:b300:ff00::36fc:fec0/122",
            "region": "ap-southeast-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da00:ff00::36f3:1fc0/122",
            "region": "us-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da00:ff00::6b17:ff00/122",
            "region": "us-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da14:7ff:f800::/53",
            "region": "ap-northeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da14:fff:f800::/53",
            "region": "ap-northeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da18:7ff:f800::/53",
            "region": "ap-southeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da18:fff:f800::/53",
            "region": "ap-southeast-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da1c:7ff:f800::/53",
            "region": "ap-southeast-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2406:da1c:fff:f800::/53",
            "region": "ap-southeast-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f14:7ff:f800::/53",
            "region": "us-west-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f14:fff:f800::/53",
            "region": "us-west-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f18:3fff:f800::/53",
            "region": "us-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f18:7fff:f800::/53",
            "region": "us-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f1c:7ff:f800::/53",
            "region": "us-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f1c:fff:f800::/53",
            "region": "us-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f1e:7ff:f800::/53",
            "region": "sa-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2600:1f1e:fff:f800::/53",
            "region": "sa-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2620:107:300f::36b7:ff80/122",
            "region": "us-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2620:107:300f::36f1:2040/122",
            "region": "us-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2620:108:700f::36f4:34c0/122",
            "region": "us-west-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2620:108:700f::36f5:a800/122",
            "region": "us-west-2",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2804:800:ff00::36e8:2840/122",
            "region": "sa-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2804:800:ff00::b147:cf80/122",
            "region": "sa-east-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2a01:578:3::36e4:1000/122",
            "region": "eu-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2a01:578:3::b022:9fc0/122",
            "region": "eu-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2a05:d018:7ff:f800::/53",
            "region": "eu-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        },
        {
            "ipv6_prefix": "2a05:d018:fff:f800::/53",
            "region": "eu-west-1",
            "service": "ROUTE53_HEALTHCHECKS"
        }
    ]
};