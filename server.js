var http = require("http");
var hostname = '127.0.0.1';
var port = 3000;

// var record_message = function(req,msg) {
//  	console.log("received: " + msg);
// };

const server = http.createServer((req, res) => {
	var content = "";

	req.on('data', chunk => {
		// console.log(`Data chunk available: ${chunk}`);
		content += chunk;
		console.log('Content is: '+content)
		
	})
    req.on('end', () => {
    	res.statusCode = 200;
	    res.setHeader('Content-Type', 'text/plain');
	    res.end("tailing logs.. " + content);
    	//end of data
  	})
 
  	// console.log('Content isss: '+content)
	// record_message(req, content);
	// res.statusCode = 200;
	// res.setHeader('Content-Type', 'text/plain');
	// res.end("tailing logs (" + content + ")");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 