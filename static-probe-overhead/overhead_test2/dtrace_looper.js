#!/usr/bin/env node

/**
 *
 * This is a random test to test probe overhead.
 * This node app is designed to loop n times and fire a dtrace probe.
 *
 * Author: Michael Zeller <mike@mikezeller.net>
 * Date: 4/23/12
 */

//number of times to loop
var n = 1000000

//setup dtrace probe
var dtp = require('dtrace-provider').createDTraceProvider('looper-test');
dtp.addProbe('looper-start', 'char *');
dtp.enable();

//function that will loop n times firing a dtrace probe.
function looper(text) {
  for ( var i = 0; i < n; i ++ ) {
  dtp.fire('looper-start', function () { return [text] });
  };
}

setTimeout(looper, 10000, "test looper");
