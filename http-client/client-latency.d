#!/usr/sbin/dtrace -s
/**
 * Time how long it takes to make an HTTP request
 * in Node.js with DTrace
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/23/12
 */

nodehttpclient*:::http-client-entry
{
	self->s = timestamp;
	this->host = copyinstr(arg0);
	this->port = arg1;
	this->path = copyinstr(arg2);
	this->method = copyinstr(arg3);
	printf("Started (%s) request to %s:%d%s", this->method, this->host, this->port, this->path);
}

nodehttpclient*:::http-client-return
/self->s/
{
	this->statusCode = arg0;
	this->delta_ns = timestamp - self->s;
	this->delta_ms = this->delta_ns / 1000 / 1000;
	printf("Request (Status %d) took %d ns (%d ms)", this->statusCode, this->delta_ns, this->delta_ms);
	self->s = 0;
}
