"use strict";

var express = require("express");
var app = express();
var ts = require("./timeserver");
var routes = require("./routes/routes");
var path = require("path");
var http = require("http");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*
ts(8080, function(date){
    console.log(date);
});
*/
app.get('/', routes.index);
app.get("/:time", routes.time);
/*app.get("/time", function(req, res){ // 1454128530
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("Ayyy lmao");
});*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});