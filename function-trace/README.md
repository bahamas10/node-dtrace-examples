Node.js Function Tracing
========================

Trace function call depth and latency in Node.js with DTrace

Inspired by [dapptrace][dapptrace] by [Brendan Gregg][brendan]

Usage
-----

Start either of the 2 Node.js scripts to start a loop of nested function calls.
The script `simple-nested-functions.js` has 3 nested functions that will get called
and fire DTrace probes on entry and return.  The script `dynamic-nested-functions.js`
has a dynamic number of nested functions created (50 by default), and can be traced.

The DTrace script `func-trace.d` can be invoked to trace both Node.js scripts, showing
function entry and return, and timing the latency. The other script `flowindent-func-trace.d`
can also be used to show the function flow using DTrace's built in flowindent
option.  The `func-trace.d` script shows how to manually achieve flowindent with a
finer grain control over the output.

Example
-------

Terminal 1:

    root@Operationss-MacBook-Pro ~ #  ./simple-nested-functions.js
    Looping with 5 second intervals... Beging DTracing now! (provider "nodefunc", pid 39677)

Terminal 2:

    root@Operationss-MacBook-Pro ~ #  ./func-trace.d
    Tracing...
    [2012 Apr 26 16:06:04]  --> func-a-entry
    [2012 Apr 26 16:06:04]    --> func-b-entry
    [2012 Apr 26 16:06:04]      --> func-c-entry
    [2012 Apr 26 16:06:04]      <-- func-c-return (24268 ns / 24 us / 0 ms)
    [2012 Apr 26 16:06:04]    <-- func-b-return (95626 ns / 95 us / 0 ms)
    [2012 Apr 26 16:06:04]  <-- func-a-return (182276 ns / 182 us / 0 ms)
    [2012 Apr 26 16:06:09]  --> func-a-entry
    [2012 Apr 26 16:06:09]    --> func-b-entry
    [2012 Apr 26 16:06:09]      --> func-c-entry
    [2012 Apr 26 16:06:09]      <-- func-c-return (20761 ns / 20 us / 0 ms)
    [2012 Apr 26 16:06:09]    <-- func-b-return (81974 ns / 81 us / 0 ms)
    [2012 Apr 26 16:06:09]  <-- func-a-return (163436 ns / 163 us / 0 ms)

You will see DTrace output everytime the chain of functions are called

[dapptrace]: http://www.brendangregg.com/DTrace/dapptrace
"dapptrace"
[brendan]: https://github.com/brendangregg
"Brendan Gregg"
