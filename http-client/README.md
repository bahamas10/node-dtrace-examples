HTTP Client Latency
===================

Monitor HTTP request latency in Node.js with DTrace

Usage
-----

The file http-client.js should be started on the command line first,
this will set up the necessary providers and probes in DTrace to watch.
Every 5 seconds an HTTP request will be made, and latency of the requests
can be monitored using client-latency.d.

Example
-------

Terminal 1:

    root@Operationss-MacBook-Pro ~ #  ./http-client.js
    Request every 5 seconds... begin DTracing now! (Provider "nodehttpclient")

Terminal 2:

    root@Operationss-MacBook-Pro ~ #  ./client-latency.d
    dtrace: script './client-latency.d' matched 2 probes
    CPU     ID                    FUNCTION:NAME
      0  58686           func:http-client-entry Started (GET) request to www.daveeddy.com:80/feed/
      2  58687          func:http-client-return Request (Status 200) took 755933696 ns (755 ms)

You will see the DTrace output every 5 seconds when a request starts and ends
