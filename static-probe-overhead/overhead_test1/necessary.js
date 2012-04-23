#!/usr/bin/env node

/**
 *
 * necessary.js contains no dtrace probes.
 * unnecessary.js contains dtrace probes for overhead testing.
 *
 * Author: Michael Zeller <mike@mikezeller.net>
 * Date: 4/23/12
 */


function print(text) {
        console.log(text);
}


print("hello world");
