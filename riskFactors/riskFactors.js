var express = require('express')

var risk = express()

function requestCSV(f,c){return new CSVAJAX(f,c);};
function CSVAJAX(filepath,callback)
{
    this.request = new XMLHttpRequest();
    this.request.timeout = 10000;
    this.request.open("GET", filepath, true);
    this.request.parent = this;
    this.callback = callback;
    this.request.onload = function() 
    {
        var d = this.response.split('\n'); /*1st separator*/
        var i = d.length;
        while(i--)
        {
            if(d[i] !== "")
                d[i] = d[i].split(','); /*2nd separator*/
            else
                d.splice(i,1);
        }
        this.parent.response = d;
        if(typeof this.parent.callback !== "undefined")
            this.parent.callback(d);
    };
    this.request.send();
};

var data = requestCSV("USA_All_States.csv",drawlines(lines)); 

risk.get('/', function(req, res){
	res.send('hey');
});

risk.listen(8080, function(req, res){
	console.log("accessing port 8080");
});