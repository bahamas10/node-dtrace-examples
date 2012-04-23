#!/usr/bin/env node

/**
 *
 * This is a random test to test probe overhead.
 * It will create an unnecessary amount of probes.
 * necessary.js is the same program without the probes.
 *
 * Author: Michael Zeller <mike@mikezeller.net>
 * Date: 4/23/12
 */

var n = 1000;
var dtp = require('dtrace-provider').createDTraceProvider('unnecessary-dtrace');
for ( var i = 0; i < n; i ++ ) {
  dtp.addProbe('unnecessary-' + i, 'char *');
}

function print(text) {
        for ( var i = 0; i < n; i ++ ) {
          dtp.fire('unnecessary-' + i, function () { return [text]; });
        }
        console.log(text);
}


print("hello world");
