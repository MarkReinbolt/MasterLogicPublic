/**
 * producer: nodejs server for producing random math expressions
 *
 * HISTORY
 * Created by Mark on 6/11/2015.
 */

var http = require("http");
var url = require("url");

function start(port, route, handle) {
    "use strict";

    function onRequest(req, res) {
        "use strict";

        var path = url.parse(req.url).pathname;
        //console.log("Server: Producer (" + path + ")");

        route(handle, path, req, res, port, 1);

    }

    http.createServer(onRequest).listen(port);
    console.log("Server: Producer started on port " + port.toString() + ".");

    // autostartup the start test for each server
    route(handle,"/starttest",{}, http.response, port, 0);
}

exports.start = start;

