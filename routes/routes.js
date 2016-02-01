"use strict";

/*
 * GET home page.
 */
exports.index = function(req, res){
    res.render('index', { title: 'Timestamp Microservice' });
};
/*
 * GET time request and return JSON object
 */
exports.time = function(req, res){
    // Regex checks if query passed in is purely a number
    var re = new RegExp(/^\d+$/);
    
    function convertDateToJSON(timeStamp){
        // If timestamp is already unix then need to multiply by 1000 to convert date to seconds
        var date = re.test(timeStamp) ? new Date(timeStamp * 1000) : new Date(timeStamp);
        var year = date.getFullYear();
        // Months are zero indexed array
        var month = date.getMonth() + 1;
        var day = date.getDate();
        // Similar check to above, if a unix timestamp passed this should be displayed to the user, because converting from day, month and year would result in different timestamp
        var unix = re.test(timeStamp)? timeStamp : Date.parse(month + " " +  day  + " " + year)/1000;
        return JSON.stringify({"unix": unix, "natural": getMonth(month) + " " + day + ", " + year});
    }
    // Function to convert month number (from month array) to string value
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
    // If all well, writehead 200 with mimetype JSON
    res.writeHead(200, {"Content-Type" : "application/json"});
    // However, we need to display a particular output when a user enters an invalid query url
    // An invalid date will be parsed as NaN
    var checkDate = new Date(req.params.time);
    // Therefore if a string is entered that IS NOT in the form date, month and year we need to return the below
    if(!re.test(req.params.time) && isNaN(Date.parse(checkDate)))
        var json = JSON.stringify({"unix": null, "natural": null});
    else
        json = convertDateToJSON(req.params.time);

    res.end(json);
};