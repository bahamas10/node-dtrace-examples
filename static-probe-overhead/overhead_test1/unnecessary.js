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


var dtp = require('dtrace-provider').createDTraceProvider('unnecessary-dtrace');
dtp.addProbe('unnecessary-1', 'char *');
dtp.addProbe('unnecessary-2', 'char *');
dtp.addProbe('unnecessary-3', 'char *');
dtp.addProbe('unnecessary-4', 'char *');
dtp.addProbe('unnecessary-5', 'char *');
dtp.addProbe('unnecessary-6', 'char *');
dtp.addProbe('unnecessary-7', 'char *');
dtp.addProbe('unnecessary-8', 'char *');
dtp.addProbe('unnecessary-9', 'char *');
dtp.addProbe('unnecessary-10', 'char *');


function print(text) {
        dtp.fire('unnecessary-1', function () { return [text] });
        dtp.fire('unnecessary-2', function () { return [text] });
        dtp.fire('unnecessary-3', function () { return [text] });
        dtp.fire('unnecessary-4', function () { return [text] });
        dtp.fire('unnecessary-5', function () { return [text] });
        dtp.fire('unnecessary-6', function () { return [text] });
        dtp.fire('unnecessary-7', function () { return [text] });
        dtp.fire('unnecessary-8', function () { return [text] });
        dtp.fire('unnecessary-9', function () { return [text] });
        dtp.fire('unnecessary-10', function () { return [text] });
        console.log(text);
}


print("hello world");
