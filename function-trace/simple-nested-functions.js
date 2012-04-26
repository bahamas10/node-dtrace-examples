#!/usr/bin/env node
/**
 * Trace function calls in Node.js with DTrace
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/24/12
 */

// Requires / Constants
var provider = 'nodefunc', // DTrace provider name
    dtp = require('dtrace-provider').createDTraceProvider(provider),
    delay = 5; // seconds

// Add probes
dtp.addProbe('func-a-entry', 'int'); // need to return a unique key to track
dtp.addProbe('func-b-entry', 'int');
dtp.addProbe('func-c-entry', 'int');
dtp.addProbe('func-a-return', 'int');
dtp.addProbe('func-b-return', 'int');
dtp.addProbe('func-c-return', 'int');
dtp.enable();

// Create 3 basic functions
function a() {
  var key = 0;
  dtp.fire('func-a-entry', function() {
    return [ key ];
  });

  b();

  dtp.fire('func-a-return', function() {
    return [ key ];
  });
}

function b() {
  var key = 1;
  dtp.fire('func-b-entry', function() {
    return [ key ];
  });

  c();

  dtp.fire('func-b-return', function() {
    return [ key ];
  });
}

function c() {
  var key = 2;
  dtp.fire('func-c-entry', function() {
    return [ key ];
  });

  dtp.fire('func-c-return', function() {
    return [ key ];
  });
}

// Call function a() in `delay` seconds
console.log('Looping with %d second intervals... Beging DTracing now! (provider "%s", pid %d)',
    delay, provider, process.pid);

setInterval(function() {
  a(); // calls b() calls c()
}, delay * 1000);
