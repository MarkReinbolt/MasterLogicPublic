/**
 * app: nodejs startup routine
 *
 * HISTORY
 * Created by Mark on 6/11/2015.
 */
var serverProducer = require("./producer");
var serverConsumer = require("./consumer");
var handlersProducer = require("./handlersProducer");
var handlersConsumer = require("./handlersConsumer");
var router = require("./router");

var portProducer = 8181;
var handleProducer = {};
handleProducer["/"] = handlersProducer.start;
handleProducer["/start"] = handlersProducer.start;
handleProducer["/starttest"] = handlersProducer.starttest;

var portConsumer = 8282;
var handleConsumer = {};
handleConsumer["/"] = handlersConsumer.compute;
handleConsumer["/compute"] = handlersConsumer.compute;

serverConsumer.start(portConsumer, router.route, handleConsumer);
serverProducer.start(portProducer, router.route, handleProducer);
serverProducer.start(portProducer+1, router.route, handleProducer);
