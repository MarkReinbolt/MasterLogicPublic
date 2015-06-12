/**
 * consumer: nodejs server to consume and compute a math result for a received expression.
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
        //console.log("Server: Consumer (" + path + ")");

        route(handle, path, req, res, port, 1);

    }

    http.createServer(onRequest).listen(port);
    console.log("Server: Consumer started on port " + port.toString() + ".");
}

exports.start = start;

