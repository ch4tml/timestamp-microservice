"use strict";

var express = require('express');
var router = express.Router();
var http = require("http");
var url = require("url");

/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Timestamp Microservice' });
};

exports.time = function(req, res){
    var url = require("url");
    // Regex checks if query passed in is purely a number
    var re = new RegExp(/^\d+$/);
    
    function convertDateToJSON(timeStamp){
        if(re.test(timeStamp))
            date = new Date(timeStamp * 1000);
        else
            date = new Date(timeStamp);
        var year = date.getFullYear();
        // Months are zero indexed array
        var month = date.getMonth() + 1;
        var day = date.getDate();
        
        var unix = re.test(timeStamp)? timeStamp : Date.parse(month + " " +  day  + " " + year)/1000;

        return JSON.stringify({"unix": unix, "natural": getMonth(month) + " " + day + ", " + year});
    }
    
    function getMonth(monthNum){
        switch (monthNum){
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
                
        }
    }
    
    res.writeHead(200, {"Content-Type" : "application/json"});
    
    var date = convertDateToJSON(req.params.time);

    console.log(re.test(req.params.time));
    console.log(re);
    console.log(req.params.time);
    console.log(date);
    res.end(date);
};