/**
 * handlersConsumer: handlers for all the consumer routes.
 *
 * HISTORY
 * Created by Mark on 6/11/2015.
 */

var url = require("url");

function computeParts(parts, op) {
    "use strict";
    var result = 0;
    var i = 0;

    // express yourself
    for (i = 0; i < parts.length; i++) {
        var val = 0;
        if (parts[i].search(/\+-\*\//) > 0) { // how tricky can it get, better wait for requirements
            if (op > 4) {
                // howd we get here?
            }
            //val = computeParts(parts[i],++op); //todo - needs some more checkout here, but you get the idea
        } else {
            val = parseInt(parts[i]);
            switch (op) {
                case 1:
                    result += val;
                    break;
                case 2:
                    result -= val;
                    break;
                case 3:
                    result *= val;
                    break;
                case 4:
                    result /= val;
                    break;
                default:
                    break;
            }
        }
    }

    // Exit
    return result;
}

function compute(req, res, port, mode) {
    "use strict";
    var resultObj = {};
    resultObj.result = 0;
    console.log("Handler: Consumer(" + port.toString() + ") 'compute' called.");


    var parsedUrl = url.parse(req.url, true);
    var parsedObj = parsedUrl.query;

    if (parsedObj["expr"] == undefined) {
        // trouble - handle it
        res.writeHead(400,{"Content-Type": "text/plain"});
        res.write("Bad request.");
        console.log("Handler: Consumer(" + port.toString() + ") Bad request.");

    } else {
        // ok, were good, lets parse it out
        var expr = parsedObj["expr"];
        console.log("Handler: Consumer(" + port.toString() + ") expr(" + expr + ")");
        var cleanExpr = expr.replace(/ =/g,""); // basic for now
        // time for a nice recursive function to handle all the fun, but KISS should work for now.
        var exprParts = cleanExpr.split("+");
        resultObj.result = computeParts(exprParts, 1);
        res.writeHead(200,{"Content-Type": "text/plain"});
        //res.writeHead(200,{"Content-Type": "application/json"});
        res.write(resultObj.result.toString());
        console.log("Handler: Consumer(" + port.toString() + ") result(" + resultObj.result.toString() + ")");
    }

    res.end();
}

exports.compute = compute;