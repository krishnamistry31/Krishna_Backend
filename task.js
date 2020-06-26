var express = require('express');
var app = express();

const g = 9.8;

//No of Bounces and coordinates of graph
//http://localhost:8081/getCoordinates/H/10/E/0.8
app.get('/getCoordinates/H/:h/E/:e', function (req, res) {
    var h = req.params.h;
    var e = req.params.e;
    var noofbounces = 0;
    var coordinates = [];
    var v0 = Math.sqrt(2*g*h);
    var t0 = v0 / g;
    var heights = [Number(h)];
    var tempheight=h;
    var times = [0,Number(t0).toFixed(3)];
    var timesum = t0;
    //Stopping when the height of ball is negligible
    for(var i=1; tempheight > 0.01;i++){
        noofbounces = noofbounces + 1;
        var nh = ( Math.pow(e,i*2) * v0 * v0 ) / (2 * g);
        heights.push(0);
        heights.push(Number(nh).toFixed(3));
        var nt = Math.pow(e,i) * v0 / g;
        times.push(Number(timesum + nt).toFixed(3));
        times.push(Number(timesum + 2 * nt).toFixed(3));
        timesum = timesum + 2 * nt;
        tempheight = nh;
    }    
    heights.push(0);
    for(var i=0;i<heights.length;i++){
        coordinates.push({'x':times[i], 'y':heights[i]});
    }
    res.json({"Noofbounces": noofbounces, "Coordinates": coordinates});
})

//Get past calculations
//http://localhost:8081/getCalculations/H/10/E/0.3
app.get('/getCalculations/H/:h/E/:e', function (req, res) {
    var h = req.params.h;
    var e = req.params.e;
    var noofbounces = 0;
    var calculations = [];
    var v0 = Math.sqrt(2*g*h);
    var t0 = v0 / g;
    var heights = [Number(h)];
    var tempheight = h;
    var times = [Number(t0).toFixed(3)];
    var timesum = t0;
    //Stopping when the height of ball is negligible
    for(var i=1; tempheight > 0.01;i++){
        noofbounces = noofbounces + 1;
        var nh = ( Math.pow(e,i*2) * v0 * v0 ) / (2 * g);
        heights.push(Number(nh).toFixed(3));
        var nt = Math.pow(e,i) * v0 / g;
        timesum = timesum + 2 * nt;
        times.push(Number(timesum).toFixed(3));
        tempheight = nh;
    }    
    for(var i=0;i<heights.length;i++){
        calculations.push({'time':times[i], 'height':heights[i]});
    }
    res.json({"Noofbounces": noofbounces, "Coordinates": calculations});
})

app.listen(8081, function () {
    console.log("App listening at 8081");
})