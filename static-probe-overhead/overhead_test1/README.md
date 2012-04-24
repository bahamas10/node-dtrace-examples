Static Probe Overhead
=====================

Example scripts for seeing static DTrace probe overhead in Node

Usage
-----

Run the 3 Node programs with the time/ptime command to compare execution times
+ necessary.js -- hello world with no dtrace
+ necessary\_withrequire.js -- hello world with require dtrace, however uses no probes
+ unnecessary.js -- hello world with 10 dtrace probes for no reason

Example
-------

	[root@notch ~/src/node-dtrace-examples/static-probe-overhead]# ptime node necessary.js
	hello world

	real        0.036861497
	user        0.028127345
	sys         0.004196653
	[root@notch ~/src/node-dtrace-examples/static-probe-overhead]# ptime node necessary_withrequire.js
	hello world

	real        0.036824987
	user        0.029144437
	sys         0.004375176
	[root@notch ~/src/node-dtrace-examples/static-probe-overhead]# ptime node unnecessary.js
	hello world

	real        0.036902379
	user        0.029326050
	sys         0.004422369
