#!/usr/bin/env node
/**
 * Count to n after a given delay.
 * Use count.d to trace execution time of counting in Node.
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/20/12
 */

// Requires
var provider = 'nodestatic', // DTrace provider name
    dtp = require('dtrace-provider').createDTraceProvider(provider),
    n = 1000000, // number to count to
    delay = 5; // seconds

// Add probes
dtp.addProbe('count-to-n-entry', 'int');
dtp.addProbe('count-to-n-return');
dtp.enable();

// Count to n
function count_to(n) {
  // Fire the 'entry' probe
  dtp.fire('count-to-n-entry', function() {
    // [ 'int' ]
    return [ n ];
  });

  // Now count
  for (var i = 0; i < n; ) {
    i++;
  }

  // Fire the 'return' probe
  dtp.fire('count-to-n-return', function() {
    return [];
  });
}

console.log('Sleeping for %d seconds... Start DTracing (Provider "%s")', delay, provider);
setTimeout(function() {
  count_to(n);
}, delay * 1000);
