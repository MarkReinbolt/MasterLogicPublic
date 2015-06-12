/**
 * handlersProducer: handlers for all the producer routes
 *
 * HISTORY
 * Created by Mark on 6/11/2015.
 */

var http = require("http");
var url = require("url");

function getRandomInteger(min,max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function start(req, res, port, mode) {
    "use strict";
    console.log("Handler: Producer(" + port.toString() + ") 'start' called.")

    // init
    var minInt = 1;
    var maxInt = 100;
    var host = "localhost";
    var getport = "8282";

    // setup the random math expression
    var n1 = getRandomInteger(minInt,maxInt);
    var n2 = getRandomInteger(minInt,maxInt);
    var sMathExpr = n1.toString() + "+" + n2.toString() + "=";
    var path = "/compute?expr=" + encodeURIComponent(sMathExpr);
    var sUrl = "http://" + host + ":" + port + path;
    console.log("Handler: Producer(" + port.toString() + ") (" + sMathExpr + ")");

    // bombs away
    var options = {
        host: host,
        path: path,
        port: getport
    };

    var callback = function(response) {
        "use strict";
        var str = "";

        response.on("data",function (chunk) {
            str += chunk;
        });
        response.on("end",function () {
            console.log("Handler: Producer(" + port.toString() + ") (" + sMathExpr + str + ")");

            // report
            if (mode > 0) {
                res.writeHead(200, {"Content-Type": "text/plain"});
                //res.write(sMathExpr + str);
                res.write(sMathExpr);
                res.end();
            }
        });
    };

    http.request(options, callback).end();
}

function starttest(req, res, port, mode) {
    "use strict";
    var ran = 0;
    console.log("Handler: Producer(" + port.toString() + ") starttest (begin)");

    // test run start
    var runagain = function() {
        "use strict";
        setTimeout( function () {
            "use strict";
            start(req, res, port, 0);
            if (++ran < 20) {
                runagain();
            } else {
                // report
                if (mode > 0) {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.write("starttest complete");
                    res.end();
                }
                console.log("Handler: Producer(" + port.toString() + ") starttest (finish)");
            }
        }, 500)
    };
    runagain();

}

exports.start = start;
exports.starttest = starttest;