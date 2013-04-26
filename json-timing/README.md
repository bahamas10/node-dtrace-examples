JSON parse and stringify
========================

Override methods with JavaScript to fire off DTrace probes

Description
-----------

This module overrides `JSON.stringify` and `JSON.parse` to fire DTrace
probes at the entry and at the return of the function.  This way,
any calls to those functions will fire off events you can capture with
DTrace.


Usage
-----

First, fire up `all-json.js`

    $ node all-json.js
    repeating every 5 seconds, provider = node-json, pid = 99147

Then, in another terminal, fire up `json-latency.d`

    $ sudo ./json-latency.d
    dtrace: script './json-latency.d' matched 8 probes
    CPU     ID                    FUNCTION:NAME
      6   4870  stringify-entry:stringify-entry
      6   4871 stringify-return:stringify-return
      6   4871 stringify-return:stringify-return JSON.stringify() took 59179ns

      6   4872          parse-entry:parse-entry
      6   4873        parse-return:parse-return
      6   4873        parse-return:parse-return JSON.parse() took 24148ns

It looks like stringify'ing is more than twice as slow as parsing... interesting.
