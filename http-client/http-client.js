#!/usr/bin/env node
/**
 * Create an HTTP client in Node and time the request
 * Run client-latency.d to track time
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/23/12
 */

// Requires / Constants
var http = require('http'),
    provider = 'nodehttpclient', // DTrace provider name
    dtp = require('dtrace-provider').createDTraceProvider(provider),
    delay = 5; // seconds

// Add probes
dtp.addProbe('http-client-entry', 'char *', 'int', 'char *', 'char *');
dtp.addProbe('http-client-return', 'int');
dtp.enable();

// Make an HTTP request given an array of headers and a callback
function make_request(options, callback) {
  // Make the request
  var req = http.request(options, callback);

  // Fire the 'entry' probe
  dtp.fire('http-client-entry', function() {
    return [ options.host, options.port, options.path, options.method ];
  });

  // Make the request
  req.end()
}

// Called when the request ends
function request_return(res) {
  // Fire the 'return' probe
  dtp.fire('http-client-return', function() {
    return [ res.statusCode ];
  });

  // Log the status and headers
  console.log('Status: %d', res.statusCode);
  console.log('Headers: %s', JSON.stringify(res.headers, null, 2));
}

// Request options
var options = {
  host: 'www.daveeddy.com',
  port: 80,
  path: '/feed/',
  method: 'GET'
};

// Start the request, giving options and a callback
console.log('Request every %d seconds... begin DTracing now! (Provider "%s")', delay, provider);
setInterval(function() {
  make_request(options, request_return);
}, delay * 1000);
