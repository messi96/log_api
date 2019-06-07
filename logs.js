var http = require("http");
var hostname = '0.0.0.0';
var port = 3000;

const server = http.createServer((req, res) => {
	var content = "";

	req.on('data', chunk => {
		// console.log(`Data chunk available: ${chunk}`);
		content += chunk;
		console.log('Tailing logs : '+content)
		
	})
    req.on('end', () => {
    	res.statusCode = 200;
	    res.setHeader('Content-Type', 'text/plain');
	    res.end("tailing logs.. " + content);
    	//end of data
  	})
 
});

server.listen(port, hostname, () => {
  console.log(`Client Server listening at http://${hostname}:${port}/`);
}); 
