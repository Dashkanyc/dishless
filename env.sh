export keyid=AKIAI4BK3JWEWTBKBVCQ
export accesskey=RiAGiv7XQ/LBpxz9m9dKDAfflcl+3uTjT2kvjKb6
export elshost=search-awsinsight-khilykr4aui3iksvikxqmqp5re.us-east-2.es.amazonaws.com
export elsport=80
export redishost=127.0.0.1
export redisport=6379
export PORT=8080
export TAGFORAPPNAME=app
export TAGFORCC=cc
----
export redishost=insightredis.0baxkq.0001.use2.cache.amazonaws.com

var aws = require('aws-sdk');
var util = require('./util/util');
var redisClient = util.redisClient;
var keyid = 'xxxxxx';
var accesskey = 'xxxxx';

aws.config.update({
    accessKeyId: keyid,
    secretAccessKey: accesskey,
    region: 'us-west-2'
});

var ec2 = new aws.EC2();
var elb = new aws.ELB();
var autoscaling = new aws.AutoScaling();
var cloudwatch = new aws.CloudWatch();
var cloudtrail = new aws.CloudTrail();
var config = new aws.Config();
var s3 = new aws.S3();
var vpcazset = new Set();
var vpcset = new Set();
var azset = new Set(); // For packing things that are available based on only availability zone but can be used across VPCs - eg. volumes
var nodes = [];

var ec2done = false;
var subnetsdone = false;
var vpcsdone = false;
var elbsdone = false;
var ebsdone = false;
var volumesdone = false;
var sgsdone = false;
var instances=[],subnets=[],vpcs=[],sgs=[],elbs=[],enis=[],volumes=[],reservations=[],vpcsgboxes=[];
var hierarchyobj, vpcobj, subnetobj, instanceobj, sgobj, volumesobj;
var currts = Math.round(new Date().getTime()/1000);

function callback(){
    elbsdone = true;
    if(ec2done && subnetsdone && vpcsdone && elbsdone && volumesdone && sgsdone){
        if(reservations.Reservations && reservations.Reservations.length > 0){
            for(var r = 0; r < reservations.Reservations.length; r++){
                instances = reservations.Reservations[r].Instances;
                for(var k=0;k<instances.length;k++){
                    var node = {};
                    node.key = instances[k].InstanceId;
                    node.text = instances[k].InstanceId;
                    var tags = instances[k].Tags;
                    if(tags && tags.length > 0){
                        for(var t = 0; t< tags.length; t++){
                            if(tags[t].Key == "Name"){
                                node.text = tags[t].Value + "  (" + node.text + ") ";
                                break;
                            }
                        }
                    }

                    node.isGroup = false;
                    node.category = "OfNodes";
                    node.group = instances[k].SubnetId;
                    node.type = 'instancestopped';
                    if(instances[k].State.Code == 16){
                        node.text = node.text + "*";
                        node.type = 'instance';
                    }
                    var az = instances[k].Placement.AvailabilityZone;
                    var vpc = instances[k].VpcId;
                    var vpcaz = vpc + "~" + az;
                    nodes.push(node);
                }
            }
        }else{
            instances = [];
        }

        for(var k=0;k<subnets.length;k++){
            var node = {};
            node.key = subnets[k].SubnetId;
            node.text = subnets[k].SubnetId + " ( " + subnets[k].CidrBlock +" ) ";
            node.isGroup = true;
            node.category = "OfGroups";
            node.type = 'subnet';
            node.group = subnets[k].VpcId + "~" + subnets[k].AvailabilityZone;
            nodes.push(node);
            var az = subnets[k].AvailabilityZone;
            var vpc = subnets[k].VpcId;
            var vpcaz = vpc + "~" + az;
            if(!vpcazset.has(vpcaz)){
                vpcazset.add(vpcaz); // I want to show availability zone in each of the vpcs .. this is why I am combining vpc , az in this set.
                var aznode = {};
                aznode.key = vpcaz;
                aznode.text = az;
                aznode.isGroup = true;
                aznode.category = "OfGroups";
                aznode.group = vpc;
                aznode.type = 'az';
                nodes.push(aznode);
            }
            if(!vpcset.has(vpc)){
                vpcset.add(vpc);
                var vpcnode = {}; var vpcsgbox = {};
                vpcnode.key = vpc; vpcsgbox.key = 'sgbox-' + vpc;
                vpcnode.text = vpc;
                for(var g=0;g<vpcs.length;g++){
                    if(vpcs[g].VpcId == vpc){
                        if(vpcs[g].IsDefault){
                            vpcnode.text = " DEFAULT VPC " + " ( " + vpcs[g].VpcId + " ) " + " ( "  + vpcs[g].CidrBlock + " ) " ;
                        }else{
                            vpcnode.text =   " ( " + vpcs[g].VpcId + " ) " + " ( "  + vpcs[g].CidrBlock + " ) ";
                        }
                        var tags = vpcs[g].Tags;
                        if(tags && tags.length>0){
                            for(var n=0;n<tags.length;n++){
                                if(tags[n].Key == "Name"){
                                    vpcnode.text = tags[n].Value + "     " + vpcnode.text;
                                    break;
                                }
                            }
                        }
                    }
                }
                vpcnode.isGroup = true; vpcsgbox.isGroup = true;
                vpcnode.category = "OfGroups"; vpcsgbox.category = 'OfGroups';
                vpcnode.type = 'vpc'; vpcsgbox.type = 'sggroupbox'; vpcsgbox.group = vpc;
                nodes.push(vpcnode); nodes.push(vpcsgbox);
            }
        }
        for(var k=0;k<volumes.length;k++){
            var node = {};
            node.key = volumes[k].VolumeId;
            node.text = volumes[k].VolumeId;
            node.isGroup = false;
            node.category = "OfNodes";
            node.group =  volumes[k].AvailabilityZone;
            node.type = 'volume';
            if(volumes[k].Attachments.length == 0){
                node.type = 'volumeunattached';
            }
            nodes.push(node);
            if(!azset.has(volumes[k].AvailabilityZone)){
                azset.add(volumes[k].AvailabilityZone);
                var aznode = {};
                aznode.key = volumes[k].AvailabilityZone;
                aznode.text = volumes[k].AvailabilityZone;
                aznode.isGroup = true;
                aznode.category = "OfGroups";
                aznode.type = 'az';
                nodes.push(aznode);
            }
        }
       for(var k=0;k<sgs.length;k++){
            var node = {};
            node.key = sgs[k].GroupId;
            node.text = sgs[k].GroupName;
            node.isGroup = false;
            node.category = "OfNodes";
            node.group = 'sgbox-' + sgs[k].VpcId;
            node.type = 'sg';
            nodes.push(node);
        }
        var region = "us-east-1";
        redisClient.set(currts+"|"+region+"|hierarchy",JSON.stringify(nodes));
        hierarchyobj = JSON.stringify(nodes);
        var snapshot = {};
        snapshot.hierarchy = hierarchyobj;
        snapshot.instances = instanceobj;
        snapshot.vpcs = vpcobj;
        snapshot.subnets = subnetobj;
        snapshot.sgs = sgobj;
        snapshot.volumes = volumesobj;
        redisClient.set(currts+"|"+region+"|snapshot",JSON.stringify(snapshot));
    }
  };

exports.getawsresources = function() {
    var region = "us-east-1";
    // Reinitialize
    ec2done = false;
    subnetsdone = false;
    vpcsdone = false;
    elbsdone = false;
    ebsdone = false;
    volumesdone = false;
    sgsdone = false;
    ndoes=[],instances=[],subnets=[],vpcs=[],sgs=[],elbs=[],enis=[],volumes=[],reservations=[];
    currts = Math.round(new Date().getTime()/1000);
    console.log(typeof(currts));
    redisClient.zadd('TSLIST',currts,currts,function(err,val){
        console.log(val);
    });

    //  cloudwatch.listMetrics({},function(err,data){console.log(JSON.stringify(data))});
    //  autoscaling.describeAutoScalingGroups({},function(err,data){console.log(JSON.stringify(data))});
    ec2.describeVpcs({},function(err,data){
        vpcs = data.Vpcs;
        vpcsdone = true;
        callback();
        redisClient.set(currts+"|"+region+"|vpclist",JSON.stringify(vpcs));
        vpcobj = JSON.stringify(vpcs);
    });

    ec2.describeSubnets({},function(err,data){
            subnets = data.Subnets;
            subnetsdone = true;
            callback();
            redisClient.set(currts+"|"+region+"|subnetlist",JSON.stringify(subnets));
            subnetobj = JSON.stringify(subnets);
    });

   /* ec2.describeLoadBalancers({},function(err,data){
            elbs = data;
            elbsdone = true;
            callback();
    });*/

    ec2.describeSecurityGroups({},function(err,data){
            sgs = data.SecurityGroups;
            sgsdone = true;
            callback();
            redisClient.set(currts+"|"+region+"|sglist",JSON.stringify(sgs));
            sgobj = JSON.stringify(sgs);
    });

    ec2.describeVolumes({},function(err,data){
            volumes = data.Volumes;
            volumesdone = true;
            callback();
            redisClient.set(currts+"|"+region+"|volumelist",JSON.stringify(volumes));
            volumesobj = JSON.stringify(volumes);
    });

    ec2.describeInstances({},function(err,data){
            reservations = data;
            ec2done = true;
            callback();
            redisClient.set(currts+"|"+region+"|instancelist",JSON.stringify(reservations));
            instanceobj = JSON.stringify(reservations);
    });

}
/*
function createInstance(imageId, count, keyPair, securityGroup, instanceType) {
    ec2.runInstances({
        ImageId: imageId,
        MinCount: count,
        MaxCount: count,
        KeyName: keyPair,
        SecurityGroups: [securityGroup],
        InstanceType: instanceType
    }, function(err, data) {
        if(err) {
            console.error(err.toString());
        } else {
            for(var i in data.Instances) {
                var instance = data.Instances[i];
                console.log('NEW:\t' + instance.InstanceId);
            }
        }
    });
}

function terminateInstance(instanceId) {
    ec2.terminateInstances({ InstanceIds: [instanceId] }, function(err, data) {
        if(err) {
            console.error(err.toString());
        } else {
           for(var i in data.TerminatingInstances) {
                var instance = data.TerminatingInstances[i];
                console.log('TERM:\t' + instance.InstanceId);
            }
        }
    });
}
*/


Elastic search query and filters are together in latest version

{
  "query": {

    "size" : 10000,
    "bool": {
      "must": [
        { "match": { "title":   "Search"        }},
        { "match": { "content": "Elasticsearch" }}
      ],
      "filter": [
        { "term":  { "status": "published" }},
        { "range": { "publish_date": { "gte": "2015-01-01" }}}
      ]
    }
  }
}

{
  "size": 0,
  "aggs": {
    "agg1": {
      "terms": {
        "field": "srcaddr"
      }
    }
  }
}


{
    "size" : 0,
    "query" : {
        "constant_score": {
            "filter": {
                "range": {
                    "price": {
                        "gte": 10000
                    }
                }
            }
        }
    },
    "aggs" : {
        "single_avg_price": {
            "avg" : { "field" : "price" }
        }
    }
}
-----


sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
curl -L "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
chmod +x /usr/bin/docker-compose
// Maybe not required but just run following 5 cmds
yum install ca-certificates
update-ca-trust force-enable
cp foo.crt /etc/pki/ca-trust/source/anchors/
update-ca-trust extract
yum -y install nfs-utils
// End
curl -sSL https://dl.bintray.com/emccode/rexray/install | sh -s -- stable
which rexray
sudo yum install -y git
sudo docker info


//Sample App - Not required
git clone https://github.com/awslabs/ecs-demo-php-simple-app
cd ecs-demo-php-simple-app
docker build -t <imagename>/amazon-ecs-sample .
docker run -p 80:80 mytestimage/amazon-ecs-sample

------

There is a specific SG I am using



docker swarm notes

I created amzn linux machines -- 3 masters and 2 nodes

and in each of them I ran these commands

sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo yum install -y git
sudo docker info

sudo -i
cd /opt
mkdir buildroot

--

masters

docker swarm init --advertise-addr 172.31.18.197

Use following commands in each of the remaining nodes to join swarm. Once joined promote appropriate nodes to manager using the command form below.
[

docker swarm join \
    --token SWMTKN-1-3775htgjsdby6g8ult97jvr7kgmzw75my1encsncsg3yyvghy7-bb8onhfukdfxgqu4v7di1h1d8 \
    172.31.18.197:2377

   ]

docker node ls

docker node promote 3rojr4hqulhzgg6vev5ajpred


-----

sudo -i
cd /opt
mkdir buildroot
git clone https://github.com/danawoodman/docker-node-hello-world
cd docker-node-hello-world
 docker build -t samplenodejsapp .
 docker run -d -p 80:4000 samplenodejsapp
 curl localhost
 docker ps
docker service create --name="mydemonodejsservice" --replicas 3   --publish 80:4000 samplenodejsapp
docker service ps mydemonodejsservice


[root@ip-172-31-18-197 docker-node-hello-world]# docker service ps mydemonodejsservice
ID                         NAME                       IMAGE            NODE              DESIRED STATE  CURRENT STATE                ERROR
620qrtpltfpul1jvf31pxg244  mydemonodejsservice.1      samplenodejsapp  ip-172-31-18-197  Running        Running about a minute ago
bw6zuikq6bv3smh2i3t1k0es3   \_ mydemonodejsservice.1  samplenodejsapp  ip-172-31-19-222  Shutdown       Rejected about a minute ago  "No such image: samplenodejsap…"
9tzvnn1x6c3jym3o20hji0nh8  mydemonodejsservice.2      samplenodejsapp  ip-172-31-9-252   Ready          Rejected 1 seconds ago       "No such image: samplenodejsap…"
07x4sqad2li8rcizounatx08d   \_ mydemonodejsservice.2  samplenodejsapp  ip-172-31-27-0    Shutdown       Rejected 6 seconds ago       "No such image: samplenodejsap…"
1qbck0g08e5rj2lwebkob278d   \_ mydemonodejsservice.2  samplenodejsapp  ip-172-31-9-252   Shutdown       Rejected 11 seconds ago      "No such image: samplenodejsap…"
bc0fgk52vczmlm41naykt2dd0   \_ mydemonodejsservice.2  samplenodejsapp  ip-172-31-27-0    Shutdown       Rejected 16 seconds ago      "No such image: samplenodejsap…"
a5olwg58nlriktrvvy7dx8y9t   \_ mydemonodejsservice.2  samplenodejsapp  ip-172-31-9-252   Shutdown       Rejected 21 seconds ago      "No such image: samplenodejsap…"
a7sf9v39ruzdjexjmqmi1xu44  mydemonodejsservice.3      samplenodejsapp  ip-172-31-4-90    Ready          Rejected 1 seconds ago       "No such image: samplenodejsap…"
0n3ehfbc459rdt3fuibygsc6g   \_ mydemonodejsservice.3  samplenodejsapp  ip-172-31-19-222  Shutdown       Rejected 6 seconds ago       "No such image: samplenodejsap…"
8ntqkxc70ff0q8m343k1tir9e   \_ mydemonodejsservice.3  samplenodejsapp  ip-172-31-4-90    Shutdown       Rejected 11 seconds ago      "No such image: samplenodejsap…"
9nwdabzo3yhgd5cr05zmnagxa   \_ mydemonodejsservice.3  samplenodejsapp  ip-172-31-19-222  Shutdown       Rejected 16 seconds ago      "No such image: samplenodejsap…"
5zugmhojc1s09jjhabbngzgm4   \_ mydemonodejsservice.3  samplenodejsapp  ip-172-31-4-90    Shutdown       Rejected 21 seconds ago      "No such image: samplenodejsap…"



------

docker service create --name jenkins \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  --mount "type=volume,source=jenkins,target=/var/jenkins_home,volume-driver=rexray" \
  --label com.df.notify=true --label com.df.distribute=true \
  --label com.df.servicePath=/jenkins --label com.df.port=8080 \
  -p 50000:50000 --network proxy jenkins:2.7.4-alpine

docker service ps jenkins

----

practicing what was give in cloudbee.com

docker service create --name=visualizer   --publish=9090:8080/tcp --constraint=node.role==manager   --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock   manomarks/visualizer
docker network create --driver overlay proxy

docker network create --driver overlay go-demo

docker network ls

docker service create --name go-demo-db \
  --network go-demo --reserve-memory 100m mongo

docker service create --name go-demo -e DB=go-demo-db \
  --network go-demo --network proxy --reserve-memory 50m \
  --label com.df.notify=true --label com.df.distribute=true \
  --label com.df.servicePath=/demo --label com.df.port=8080 \
  vfarcic/go-demo

docker service ls

docker service ps go-demo

docker service inspect go-demo --pretty


docker service create --name swarm-listener \
  --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
  -e DF_NOTIF_CREATE_SERVICE_URL=http://proxy:8080/v1/docker-flow-proxy/reconfigure \
  -e DF_NOTIF_REMOVE_SERVICE_URL=http://proxy:8080/v1/docker-flow-proxy/remove \
  --constraint 'node.role==manager' --network proxy \
  vfarcic/docker-flow-swarm-listener

docker service create -e MODE=swarm -e LISTENER_ADDRESS=swarm-listener \
  -p 80:80 -p 443:443 --network proxy --replicas 3 \
  --name proxy vfarcic/docker-flow-proxy

docker service ls

docker service ps proxy

http://54.183.181.43/demo/hello

docker service create --name registry -p 5000:5000 \
  --mount "type=volume,source=registry,target=/var/lib/registry,volume-driver=rexray" \
  --reserve-memory 100m registry

docker service ps registry



docker service create --name jenkins \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  --mount "type=volume,source=jenkins,target=/var/jenkins_home,volume-driver=rexray" \
  --label com.df.notify=true --label com.df.distribute=true \
  --label com.df.servicePath=/jenkins --label com.df.port=8080 \
  -p 50000:50000 --network proxy jenkins:2.7.4-alpine

docker service ps jenkins

http://54.183.181.43/jenkins

that one did not work

i tried this

docker service create --name jenkins     -p 8082:8080     -p 50000:50000     -e JENKINS_OPTS="--prefix=/jenkins"     --mount "type=bind,source=$PWD/docker/jenkins,target=/var/jenkins_home"     --reserve-memory 300m     jenkins:2.7.4-alpine


------

How to get logs?

You can get logs for individual container, but only from the node they're running on (see #23710)

Work is in progress to improve this, and to support logs for services (see #24812)

I'll close this issue because we're tracking this through #24812, but thanks for reporting

https://github.com/docker/docker/issues/27396



docker service ls
docker service ps visualizer
docker inspect -f "{{.Status.ContainerStatus.ContainerID}}" 6gqdomcsatsglka8952x7ujk2


docker logs 66ad9203aada5178b95e99dcab01b55e6d56462542bf0f6fcea4d3e905c21115

[Above command from the node where it is running]


// SOme error related to volume driver rexray

docker service create --name jenkins \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  --mount "type=volume,source=jenkins,target=/var/jenkins_home,volume-driver=rexray" \
  --label com.df.notify=true --label com.df.distribute=true \
  --label com.df.servicePath=/jenkins --label com.df.port=8080 \
  -p 50000:50000 --network proxy jenkins:2.7.4-alpine

// Going to try without rexray

docker service create --name jenkins \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  --mount "type=volume,source=jenkins,target=/var/jenkins_home" \
  --label com.df.notify=true --label com.df.distribute=true \
  --label com.df.servicePath=/jenkins --label com.df.port=8080 \
  -p 50000:50000 --network proxy jenkins:2.7.4-alpine


// I found the password from log file. But it has to be gotten from the file given in the command below. This is TODO

26325af678d644f5963e5eb2e9468562

docker run -it --rm \
  --volume-driver rexray -v jenkins:/var/jenkins_home \
  alpine cat /var/jenkins_home/secrets/initialAdminPassword

  //

  JENKINS FAILOVER

  docker service ps jenkins

  IP=[...] # Manager private IP

  docker -H tcp://$IP:2375 rm -f $(docker \
    -H tcp://$IP:2375 ps -qa -f "ancestor=jenkins:2.7.4-alpine")

  docker service ps jenkins

  exit

  /// INSTALL suggested plugins

  /// And then follow up with swarm plugin

  http://[IP]/jenkins/pluginManager/available
  Select Self-Organizing Swarm Plug-in Modules
  Click Install without restart



  // Jenkins agents

  export JENKINS_IP=[...] # Manager private IP

  docker service create --name jenkins-agent \
    -e COMMAND_OPTIONS="-master http://$JENKINS_IP/jenkins -username admin -password admin -labels 'docker' -executors 5" \
    --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
    --mount "type=bind,source=/workspace,target=/workspace" \
    --mode global vfarcic/jenkins-swarm-agent

  docker service ps jenkins-agent

  [In above again mount part did not work. i removed and ran .. let's see]

  This URL did list all 5 nodes

  http://54.219.173.127/jenkins/computer/

  But the available space showed as 0GB


  docker service create --name registry -p 5000:5000 \
    --mount "type=volume,source=registry,target=/var/lib/registry,volume-driver=rexray" \
    --reserve-memory 100m registry

  docker service ps registry

  http://54.219.173.127/jenkins/configure



  Jenkins

  New Item -> Pipeline ->

  -------


  ATTEMPT 2

  I created a vm in USE2 and did these

  yum update -y
  yum install git -y
  yum install jq
  cd /opt
  mkdir workspace
  cd workspace
  git clone https://github.com/vfarcic/cloud-provisioning.git

  cd cloud-provisioning/terraform/aws-full
export AWS_ACCESS_KEY_ID=AKIAIMK4MUNI43LYQKMA
export AWS_SECRET_ACCESS_KEY=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
export AWS_DEFAULT_REGION=us-east-1
aws ec2 create-key-pair --key-name devops21 | jq -r '.KeyMaterial' >devops21.pem
packer build -machine-readable packer-ubuntu-docker-compose.json \
  | tee packer-ubuntu-docker-compose.log


  ----
  installterraform.sh


  #!/usr/bin/env bash

  # Modified version of this gist: https://gist.github.com/Adron/90863e51c8c5c0ad2049890bcd8abbfb

  # Get URLs for most recent versions
  terraform_url=$(curl --silent https://releases.hashicorp.com/index.json | jq '{terraform}' | egrep "linux.*64" | sort -rh | head -1 | awk -F[\"] '{print $4}')
  packer_url=$(curl --silent https://releases.hashicorp.com/index.json | jq '{packer}' | egrep "linux.*64" | sort -rh | head -1 | awk -F[\"] '{print $4}')

  # Create a move into directory.
  cd
  mkdir packer
  mkdir terraform && cd $_

  # Download Terraform. URI: https://www.terraform.io/downloads.html
  curl -o terraform.zip $terraform_url
  # Unzip and install
  unzip terraform.zip

  # Change directory to Packer
  cd ~/packer

  # Download Packer. URI: https://www.packer.io/downloads.html
  curl -o packer.zip $packer_url
  # Unzip and install
  unzip packer.zip

  echo '
  # Terraform & Packer Paths.
  export PATH=~/terraform/:~/packer/:$PATH
  ' >>~/.bash_profile

  source ~/.bash_profile

  -----

  run the above shell and copy the executable to /usr/bin





  ------



-- Have AMI ID from above step [or corresponding image]

git clone https://github.com/vfarcic/cloud-provisioning.git

cd cloud-provisioning/terraform/aws-full

export AWS_ACCESS_KEY_ID=[...]

export AWS_SECRET_ACCESS_KEY=[...]

export AWS_DEFAULT_REGION=us-east-1

aws ec2 create-key-pair --key-name devops21 | jq -r '.KeyMaterial' > devops21.pem






  export TF_VAR_aws_access_key=AKIAIMK4MUNI43LYQKMA
  export TF_VAR_aws_secret_key=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
  export TF_VAR_aws_default_region=us-east-1

  export TF_VAR_swarm_ami_id=ami-517adc47

  terraform apply -target aws_instance.swarm-manager \
    -var swarm_init=true -var swarm_managers=1 -var rexray=true

  ssh -i devops21.pem ec2-user@$(terraform output \
    swarm_manager_1_public_ip) docker node ls



eu-west-2  ami-f1949e95  t2.small


-----------------------

Round 2

STEP 1

Have security Group Ready -- Refer to our Cloud Account for inbound rules

  sudo -i
  sudo yum update -y
  sudo yum install -y docker
  sudo service docker start
  sudo usermod -a -G docker ec2-user
  curl -L "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
  chmod +x /usr/bin/docker-compose
  // Maybe not required but just run following 5 cmds
  yum install ca-certificates
  update-ca-trust force-enable
  //cp foo.crt /etc/pki/ca-trust/source/anchors/
  update-ca-trust extract
  yum -y install nfs-utils
  // End
  curl -sSL https://dl.bintray.com/emccode/rexray/install | sh -s -- stable
  which rexray
  sudo yum install -y git
  sudo docker info

  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 4.4.5
  node -e "console.log('Running Node.js ' + process.version)"

  ------------------------

  STEP 2

1) Init M1 with [docker swarm init --advertise-addr 172.31.18.197]
2) Join the rest with [

                        docker swarm join \
                            --token SWMTKN-1-3775htgjsdby6g8ult97jvr7kgmzw75my1encsncsg3yyvghy7-bb8onhfukdfxgqu4v7di1h1d8 \
                            172.31.18.197:2377

                           ]
3) Once all joined - from M1 - docker promote the ones you want as masters. If you want masters to not serve as node [host apps] then you need to run another command
- we should probably give capability through UI

  masters

  docker swarm init --advertise-addr 172.31.18.197

  Use following commands in each of the remaining nodes to join swarm. Once joined promote appropriate nodes to manager using the command form below.
  [

  docker swarm join \
      --token SWMTKN-1-3775htgjsdby6g8ult97jvr7kgmzw75my1encsncsg3yyvghy7-bb8onhfukdfxgqu4v7di1h1d8 \
      172.31.18.197:2377

     ]

  docker node ls

docker swarm join-token manager
docker swarm join-token worker

  docker node promote 3rojr4hqulhzgg6vev5ajpred


ID                           HOSTNAME         STATUS  AVAILABILITY  MANAGER STATUS
3m6srgu3qqxhgpicxo81jk2qx *  ip-172-31-8-108  Ready   Active        Leader
5ekpie6dta6p9ee0becmbl78c    ip-172-31-4-223  Ready   Active        Reachable
79xjepvfab1rxscoecpg30cqg    ip-172-31-3-224  Ready   Active
7id6vt284du80c8y4w4ny2ru8    ip-172-31-8-50   Ready   Active
9zi02cw3dttvh58wm6jvuhol8    ip-172-31-3-123  Ready   Active        Reachable

-------------

STEP 3

Swarm Visualizer

1) From M1 install visualizer

docker service create --name=visualizer \
  --publish=9090:8080/tcp --constraint=node.role==manager \
  --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
  manomarks/visualizer

2) http://54.241.153.112:9090/   [M1's IP]

---------------

STEP 4

Docker networking

docker network create --driver overlay proxy

docker network create --driver overlay go-demo

docker network ls


NETWORK ID          NAME                DRIVER              SCOPE
cab5a1c31afa        bridge              bridge              local
bdeae0e79508        docker_gwbridge     bridge              local
bfwhnbel01xw        go-demo             overlay             swarm
f0bb5a5af339        host                host                local
99154q48g5tf        ingress             overlay             swarm
6f75776fb399        none                null                local
dgo6k5vulto0        proxy               overlay             swarm

---------------


STEP 5

Create couple of services [one is a go demo and another is mongo db service .. we need to come up with comprehensive lists]

-----

STEP 5

Swarm Reverse Proxy


docker service create --name swarm-listener \
  --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
  -e DF_NOTIF_CREATE_SERVICE_URL=http://proxy:8080/v1/docker-flow-proxy/reconfigure \
  -e DF_NOTIF_REMOVE_SERVICE_URL=http://proxy:8080/v1/docker-flow-proxy/remove \
  --constraint 'node.role==manager' --network proxy \
  vfarcic/docker-flow-swarm-listener

docker service create -e MODE=swarm -e LISTENER_ADDRESS=swarm-listener \
  -p 80:80 -p 443:443 --network proxy --replicas 3 \
  --name proxy vfarcic/docker-flow-proxy

docker service ls

docker service ps proxy

[http://54.241.153.112/demo/hello]

-------

STEP 6

Registry service

docker service create --name registry -p 5000:5000 \
  --mount "type=volume,source=registry,target=/var/lib/registry,volume-driver=rexray" \
  --reserve-memory 100m registry

docker service ps registry

---------


STEP 7

Jenkins Service

docker service create --name jenkins \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  --mount "type=volume,source=jenkins,target=/var/jenkins_home" \
  --label com.df.notify=true --label com.df.distribute=true \
  --label com.df.servicePath=/jenkins --label com.df.port=8080 \
  -p 50000:50000 --network proxy jenkins:2.7.4-alpine

docker service ps jenkins

And find the IP and do this

http://172.31.8.50:8080/jekins

Note:

Original command was

docker service create --name jenkins \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  --mount "type=volume,source=jenkins,target=/var/jenkins_home,volume-driver=rexray" \
  --label com.df.notify=true --label com.df.distribute=true \
  --label com.df.servicePath=/jenkins --label com.df.port=8080 \
  -p 50000:50000 --network proxy jenkins:2.7.4-alpine

  But rexray volume is not working. Need to fix this or get to the bottom of this


http://54.215.236.177/jenkins

How to get jenkins password?

From Master M1:
docker service ls
docker service ps jenkins
docker inspect -f "{{.Status.ContainerStatus.ContainerID}}" 6gqdomcsatsglka8952x7ujk2

GO TO NODE WHERE jenkins is running [54.215.236.177]

docker logs <containerID>

Get admin password and then specify it in jenkins url


Select Typical plugins used by Jenkins community. Complete installation and set 'admin' 'admin'

------

STEP 8

Jenkins failover

You can try to stop or remove the jenkins container. [not the jenkins service.. just container] it will failover to another node

[ I was able to validate failover. but jenkins seem to completely start as fresh container. Not with the admin password set and the
plugins setup]
------

STEP 9

Go to http://52.9.104.24/jenkins/pluginManager/available
Self-Organizing Swarm Plug-in   -- Install without restart


-------

STEP 10
Jenkins agent and registry

Jenkins Agent

docker service create --name jenkins-agent \
  -e COMMAND_OPTIONS="-master http://52.9.104.24/jenkins -username admin -password admin -labels 'docker' -executors 5" \
  --mode global vfarcic/jenkins-swarm-agent

[
docker service create --name jenkins-agent \
  -e COMMAND_OPTIONS="-master http://52.9.104.24/jenkins -username admin -password admin -labels 'docker' -executors 5" \
  --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
  --mount "type=bind,source=/workspace,target=/workspace" \
  --mode global vfarcic/jenkins-swarm-agent
  ]

  [Need to fix the mount issue again]

  Registry

  docker service create --name registry -p 5000:5000 \
    --reserve-memory 100m registry

[
docker service create --name registry -p 5000:5000 \
  --mount "type=volume,source=registry,target=/var/lib/registry,volume-driver=rexray" \
  --reserve-memory 100m registry
]

docker service ps registry


--------

STEP 11

Env variables

http://52.9.104.24/jenkins/configure

Environment Variables add and save the following

PROD_IP 172.31.4.223    [Private IP of swarm manager 1]


1) List of nodes
2) List of services
3) List of containers grouped by app [maybe color coded and given a symbol]
4) size of container, disk space, running time etc,
5) ability scale up / down
6) create new service/ delete services
7) bring a new node up or down
8) top command on each container
9) ssh to a container
10) Link to jenkins url and automatically configuring jenkins etc