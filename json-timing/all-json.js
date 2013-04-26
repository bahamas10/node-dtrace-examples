var data = {
  name: 'Dave',
  url: 'http://www.daveeddy.com',
  favoritebands: [
    'The Reign of Kindo',
    'As I Lay Dying',
    'Between the Buried and me'
  ]
};

////////////////////////////////////////////
// dtrace setup
var provider = 'node-json';
var dtp = require('dtrace-provider').createDTraceProvider(provider);
dtp.addProbe('stringify-entry');
dtp.addProbe('stringify-return');
dtp.addProbe('parse-entry');
dtp.addProbe('parse-return');

function noop() { return []; }

// override stringify
var stringify = JSON.stringify.bind(JSON);
JSON.stringify = function() {
  dtp.fire('stringify-entry', noop);
  var r = stringify.apply(JSON, arguments);
  dtp.fire('stringify-return', noop);
  return r;
};

// override parse
var parse = JSON.parse.bind(JSON);
JSON.parse = function() {
  dtp.fire('parse-entry', noop);
  var r = parse.apply(JSON, arguments);
  dtp.fire('parse-return', noop);
  return r;
};

dtp.enable();
/////////////////////////////////////////////
// usage

var interval = 5;
console.log('repeating every %d seconds, provider = %s, pid = %d',
    interval,
    provider,
    process.pid);

function go() {
  console.log('tick');
  var s = JSON.stringify(data);
  var d = JSON.parse(s);
}
setInterval(go, interval * 1000);
go();
