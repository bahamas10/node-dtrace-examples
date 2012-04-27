#!/usr/sbin/dtrace -s
/**
 * Similar to func-trace.d, this uses dtraces built
 * in capability to indent with function flow
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/26/12
 */

#pragma D option quiet
#pragma D option flowindent

nodefunc*:::*entry
{
	self->func[arg0] = timestamp;
	printf("[%Y] --> %s\n", walltimestamp, probename);
}

nodefunc*:::*return
/self->func[arg0]/
{
	this->lat_ns = timestamp - self->func[arg0];
	this->lat_us = this->lat_ns / 1000;
	this->lat_ms = this->lat_us / 1000;

	printf("[%Y] <-- %s (%d ns / %d us / %d ms)\n",
		walltimestamp, probename, this->lat_ns, this->lat_us, this->lat_ms);

	self->func[arg0] = 0;
}
