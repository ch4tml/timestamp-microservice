/*"use strict";

var net = require("net");

module.exports = function(portNumber, callback){
    var server = net.createServer(function(socket){
        return callback(socket.end(writeDate()));
    });
    server.listen(8080);  

    function writeDate(){
        var date = new Date();
        var year = date.getFullYear();
        // Months are zero indexed array
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        
        var timeStamp = year + "-" + zeroPad(month) + "-" + zeroPad(day) + " " + zeroPad(hours) + ":" + zeroPad(minutes) + "\n";
        return timeStamp;
    }
    
    function zeroPad(number){
        var string = String(number);
        while(string.length < 2)
            string = "0" + string;
        return string;
    }
}*/