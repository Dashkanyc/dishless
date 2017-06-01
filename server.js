// Do not start anything if env variables are not set
var config = require('./config/config')

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


