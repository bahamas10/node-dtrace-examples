#!/usr/sbin/dtrace -s
/**
 * Time how long it takes node to count to a given value
 * Run this script after starting count.js
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/20/12
 */

nodestatic*:::count-to-n-entry
{
	self->s = timestamp;
	printf("Starting to count to %d", arg0);
}

nodestatic*:::count-to-n-return
/self->s/
{
	this->delta_ns = timestamp - self->s;
	this->delta_ms = this->delta_ns / 1000 / 1000;
	printf("Counted in %d ns (%d ms)", this->delta_ns, this->delta_ms);
	self->s = 0;
}
