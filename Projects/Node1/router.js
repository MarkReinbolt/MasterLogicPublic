/**
 * router: router code
 *
 * HISTORY
 * Created by Mark on 6/11/2015.
 */

function route(handle, path, req, res, port, mode) {
    "use strict";

    if (typeof handle[path] === 'function') {
        handle[path](req, res, port, mode);
    } else {
        console.log("Router: No handler found for " + path)
        if (mode > 0) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("Request not found.");
            res.end();
        }
    }
}

exports.route = route;
