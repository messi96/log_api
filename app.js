var sys = require('util');
var spawn = require('child_process').spawn;
var file, servers;

if (process.argv.length < 4) {
  return sys.puts("Usage: node app.js file server1 server2 server3....");
}

file = process.argv[2];
servers  = process.argv.slice(3);

function writeData(host, data) {
  console.log(host + ": " + data);
}

function readData(host, data) {
  var lines = data.toString().split("\n")
  for (var i = 0, len = lines.length; i < len; i++) {
    if (lines[i].length > 0) {
      writeData(host, lines[i])
    }
  }
}

for (var x = 0, len = servers.length; x < len; x++) {
  var server = servers[x];					//read same file from multiple servers

  var tail = spawn("ssh", [server, "tail", "-f", file]);

  tail.stdout.on("data", function(data) {
    readData(server, data);
  });
}
