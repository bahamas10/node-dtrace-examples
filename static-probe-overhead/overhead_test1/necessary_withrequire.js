#!/usr/bin/env node

/**
 *
 * necessary_withrequire.js contains no dtrace probes but requires a dtrace import
 *
 * Author: Michael Zeller <mike@mikezeller.net>
 * Date: 4/23/12
 */

var dtp = require('dtrace-provider').createDTraceProvider('necessary-withdtrace');
function print(text) {
        console.log(text);
}


print("hello world");
