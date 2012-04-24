Static Probe Overhead
=====================

Example script for seeing static DTrace probe overhead in Node

Usage
-----

-Run "node dtrace_looper.js"  it will sleep 10s giving you a chance to start dtrace if you wish. 

Example
-------
	**Tracing with dtrace:**
	[root@notch ~/src/node-dtrace-examples/static-probe-overhead/overhead_test2]# ptime node dtrace_looper.js 
	real       11.798035315
	user        1.783312948
	sys         0.012409268
	
	**No dtrace running:**
	[root@notch ~/src/node-dtrace-examples/static-probe-overhead/overhead_test2]# ptime node dtrace_looper.js 
	real       10.384005363
	user        0.371518895
	sys         0.005954971
