var http = require("http"),
    file = process.argv[2],
    hostname = (process.argv[3]) ? process.argv[3] : "localhost",
    port = (process.argv[4]) ? parseInt(process.argv[4]) : 3000;
const { spawn } = require('child_process');

console.log("logs from " + hostname + ":" + port);

var send_log = function(data) {
    var req = http.request({
        port: port,
        host: hostname,
        method: 'POST',
        path: '/',
    }, function(response) {
       // Continuously update stream with data
       var body = '';
       response.on('data', function(data) {
          body += data;
       });
       
       response.on('end', function() {
          // Data received completely.
          console.log(body);
       });
    });
    req.write(data);
    req.end();
}

var monitor_file = function(filename) {
    console.log("monitor_file: monitoring " + filename);
    var cmd = spawn("tail", ["-f", filename]);
    cmd.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        send_log(data);							//for response
    });
};

monitor_file(file);
