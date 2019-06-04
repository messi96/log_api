var http = require("http"),
    file = process.argv[2],
    hostname = (process.argv[3]) ? process.argv[3] : "localhost",
    port = (process.argv[4]) ? parseInt(process.argv[4]) : 8000;
const { spawn } = require('child_process');

console.log("sending logs to " + hostname + ":" + port);

var send_log = function(msg) {
    var req = http.request({
        port: port,
        host: hostname,
        method: 'POST',
        path: '/',
    });
    req.sendBody(msg, encoding="ascii");
//    req.finish();
    res.send();
}

var monitor_file = function(filename) {
    console.log("monitor_file: monitoring " + filename);
    var cmd = spawn("tail", ["-f", filename]);
    cmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
};

monitor_file(file);
