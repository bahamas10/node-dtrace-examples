#!/usr/sbin/dtrace -s
/**
 * Watch function calls in Node.js
 * Inspired by http://www.brendangregg.com/DTrace/dapptrace
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Credits: Brendan Gregg
 * Date: 4/25/12
 */

#pragma D option quiet

BEGIN
{
	printf("Tracing...\n");
	depth = 0;
}

nodefunc*:::*entry
{
	self->func[arg0] = timestamp;
	printf("[%Y] %*s --> %s\n", walltimestamp, depth, "", probename);

	depth += 2;
}

nodefunc*:::*return
/self->func[arg0]/
{
	depth -= 2;

	this->lat_ns = timestamp - self->func[arg0];
	this->lat_us = this->lat_ns / 1000;
	this->lat_ms = this->lat_us / 1000;

	printf("[%Y] %*s <-- %s (%d ns / %d us / %d ms)\n",
		walltimestamp, depth, "", probename, this->lat_ns, this->lat_us, this->lat_ms);

	self->func[arg0] = 0;
}
