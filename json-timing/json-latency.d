#!/usr/sbin/dtrace -s
/**
 * track latency of JSON.* commands in Node
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/25/13
 * License: MIT
 */

/* print something for every probe */
node-json*::: {}

node-json*:::parse-entry
{
	self->parse = timestamp;
}
node-json*:::parse-return
/self->parse/
{
	this->delta = timestamp - self->parse;
	printf("JSON.parse() took %dns\n", this->delta);
	self->parse = 0;
}

node-json*:::stringify-entry
{
	self->stringify = timestamp;
}
node-json*:::stringify-return
/self->stringify/
{
	this->delta = timestamp - self->stringify;
	printf("JSON.stringify() took %dns\n", this->delta);
	self->stringify = 0;
}
