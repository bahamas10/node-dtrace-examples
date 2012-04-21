#!/usr/bin/env node

// Requires
var http = require('http'),
    dtp = require('dtrace-provider').createDTraceProvider('nodehttpexample'),
    host = 'localhost',
    port = 8000,
    delay = 5; // seconds

// Add probes
dtp.addProbe('http-server-start', 'char *', 'int');
dtp.addProbe('http-server-ready');
dtp.enable();

// Function to call to create and start an HTTP server
function start_server(host, port) {
  // Fire the 'start' probe
  dtp.fire('http-server-start', function() {
    // [ 'char*', 'int' ]
    return [ host, port ];
  });
  // Create the server and run it, with a callback of server_started
  http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
  }).listen(port, host, server_started);
}

function server_started() {
  // server started, fire the 'started' probe
  dtp.fire('http-server-ready', function() {
    return [];
  });
}

// Delay the start so you can run DTrace against it
console.log('Starting server in %d seconds... begin DTracing now!', delay);
setTimeout(function() {
  start_server(host, port);
  console.log('Server running at http://%s:%d/', host, port);
}, delay * 1000);
