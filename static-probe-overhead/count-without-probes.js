#!/usr/bin/env node
/**
 * Count to a given number without DTrace probes
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/20/12
 */

var n = 1000000

// Count to n
function count_to(n) {
  for (var i = 0; i < n; ) {
    i++;
  }
}

count_to(n);
