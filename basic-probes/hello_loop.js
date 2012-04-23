#!/usr/bin/env node

/**
 * This prints "hello world" every 2000ms, it will also print its PID
 * Use the PID as an argument to the dtrace one liner
 *
 * Author: Michael Zeller <mike@mikezeller.net>
 * Date: 4/20/12
 */

var dtp = require('dtrace-provider').createDTraceProvider('helloloop');
dtp.addProbe('print-entry', 'char *');

console.log("The PID is: " + process.pid);
function echoserver(text) {
  dtp.fire('print-entry', function () {
    return [text];
  });
  console.log(text);
}

dtp.enable();
setInterval(echoserver, 2000, 'hello world');
