#!/usr/bin/env node
/**
 * Dynamically create nested functions
 * to trace with DTrace
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/25/12
 */

// Requires / Constants
var provider = 'nodefunc', // DTrace provider name
    dtp = require('dtrace-provider').createDTraceProvider(provider),
    delay = 5, // seconds
    num_funcs = 50; // Number of functions to create

// Create the probes and the functions
var funcs = { 0 : null };
for (var i = 1; i <= num_funcs; i++) {
  // Add the probes
  dtp.addProbe('func-'+i+'-entry', 'int');
  dtp.addProbe('func-'+i+'-return', 'int');

  // Add the function
  funcs[i] = function(j) {
    dtp.fire('func-'+j+'-entry', function() {
      return [ j ];
    });

    // Check to see if there are more functions to call
    if (j < num_funcs) {
      funcs[j+1](j+1);
    }

    dtp.fire('func-'+j+'-return', function() {
      return [ j ];
    });
  };
}

// Enable the probes
dtp.enable();

// Call function a() in `delay` seconds
console.log('Looping with %d second intervals... Beging DTracing now! (provider "%s", pid %d)',
    delay, provider, process.pid);

setInterval(function() {
  // Start the chain reaction
  funcs[1](1);
}, delay * 1000);
