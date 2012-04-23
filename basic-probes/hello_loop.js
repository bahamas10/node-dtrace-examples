var dtp = require('dtrace-provider').createDTraceProvider('helloloop');
dtp.addProbe('print-entry', 'char *');

function echoserver(text) {
        dtp.fire('print-entry', function () {
        return [text] 
        });
        console.log(text);
}

dtp.enable();
setInterval(echoserver, 2000, 'hello world');
