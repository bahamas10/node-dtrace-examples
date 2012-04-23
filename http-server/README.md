HTTP Server Latency
===================

Monitor HTTP server creation latency in Node.js with DTrace

Usage
-----

The file http-server.js should be started on the command line first,
This will set up the necessary providers and probes in DTrace to watch.
There is a 5 second delay from when you run the script untill the `start_server()`
method is called.  During that delay fire up one of the DTrace scripts to
gain insight into the Node process.

Example
-------

Terminal 1:

    root@Operationss-MacBook-Pro ~/dev/node-dtrace-examples/http-server #  ./http-server.js
    Starting server in 5 seconds... begin DTracing now! (Provider "nodehttpserver")

Terminal 2:

    root@Operationss-MacBook-Pro ~/dev/node-dtrace-examples/http-server #  ./server-ready-latency.d
    dtrace: script './server-ready-latency.d' matched 2 probes
    CPU     ID                    FUNCTION:NAME
      0   3093           func:http-server-start Starting server on localhost:8000
      0   3094           func:http-server-ready Server started in 14132868 ns (14 ms)

You will see the DTrace output after the 5 second delay is up and the HTTP
server has bound to its port.
