#!/usr/sbin/dtrace -s
/**
 * See how long it takes to start an HTTP server in Node
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/20/12
 */

nodehttpexample*:::http-server-start
{
	self->s = timestamp;
	printf("Starting server on %s:%d", copyinstr(arg0), arg1);
}

nodehttpexample*:::http-server-ready
/self->s/
{
	this->delta_ns = timestamp - self->s;
	this->delta_ms = this->delta_ns / 1000 / 1000;
	printf("Server started in %d ns (%d ms)", this->delta_ns, this->delta_ms);
	self->s = 0;
}
