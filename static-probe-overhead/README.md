Static Probe Overhead
=====================

Example scripts for seeing static DTrace probe overhead in Node

Usage
-----

Run either of the 2 Node programs with the time/ptime command to compare execution times

Example
-------

    dave @ [ Operationss-MacBook-Pro :: (Darwin) ] ~ $ time ./count-without-probes.js

    real        0m0.041s
    user        0m0.032s
    sys         0m0.009s
    dave @ [ Operationss-MacBook-Pro :: (Darwin) ] ~ $ time ./count-with-probes.js

    real        0m0.046s
    user        0m0.035s
    sys         0m0.009s
