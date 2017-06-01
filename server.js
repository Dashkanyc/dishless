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


app.get('/hello',function(req,res){return res.send('Hello world!!!')});

app.listen(port);


