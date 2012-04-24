#!/usr/bin/env node

/**
 *
 * This node app is used to test firing a probe while running dtrace vs no running dtrace
 * It will loop n times and fire a probe.  You time the test tracing with dtrace and testing without tracing.
 * When executing the app it will sleep 10s giving you a chance to start tracing with dtrace.
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
