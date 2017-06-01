// Do not start anything if env variables are not set
var config = require('./config/config')
if(process.env.keyid && process.env.accesskey){console.log("Key ID and Access Key are set fine")}else{console.log("Please set AWS KEY ID and Access KEY env variables");process.exit(0)}
if(process.env.elshost && process.env.elsport){console.log("ELS HOST AND PORT ARE SET")}else{console.log("Please set ELS HOST AND PORT");process.exit(0)}
if(process.env.TAGFORAPPNAME){console.log('Using [ ' +  process.env.TAGFORAPPNAME +" ] as tag for application name")} else {console.log('TAGFORAPPNAME env variable is not set. Using [ ' + config.apptag + '] as tag for appication name')}
if(process.env.TAGFORCC){console.log('Using [ ' +  process.env.TAGFORCC +" ] as tag for cost center")} else {console.log('TAGFORCC env variable is not set. Using [ ' + config.cctag + '] as tag for appication name')}

var express = require("express"),
    app = express();
var port = process.env.PORT || 80;
var util = require('./util/util');
var redisClient = util.redisClient;
var bodyParser = require('body-parser');


// Routes, Body Parsers
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// This route is only to test
app.get('/getresourcefromredis/:id', function(req, res) {
    redisClient.get(req.params.id, function(err, val) {
        if (err) {
            return res.send(err)
        }
        return res.send(val);
    });
});
app.post('/getresourcefromredis/:id', function(req, res) {
    console.log(req.params.id);
    redisClient.get(req.params.id, function(err, val) {
        if (err) {
            return res.send(err)
        }
        return res.send(val);
    });
});

app.get('/hello',function(req,res){return res.send('Hello world!!!')});

app.listen(port);


