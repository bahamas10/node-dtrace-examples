Basic Probes in Node
=====================

Basic examples of DTrace in Node

Usage
-----

Run any of the Node programs and their associated DTrace scripts

Examples
--------

Counting to 1,000,000.  Start count.js, and run count.d in a separate window.

    root@Operationss-MacBook-Pro ~/dev/node-dtrace-examples/basic-probes #  ./count.d
    dtrace: script './count.d' matched 2 probes
    CPU     ID                    FUNCTION:NAME
      0  19025            func:count-to-n-entry Starting to count to 1000000
      0  19026           func:count-to-n-return Counted in 4357987 ns (4 ms)

Hello Loop:

	node hello_loop.js

	dtrace -n 'helloloop$target::: { printf("%Y %s", walltimestamp, copyinstr(arg0)); }' -p PID 
	dtrace: description 'helloloop$target::: ' matched 1 probe
	CPU     ID                    FUNCTION:NAME
  	5    70247                 func:print-entry 2012 Apr 20 22:02:35 hello world
 	13   70247                 func:print-entry 2012 Apr 20 22:02:37 hello world
