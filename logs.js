var http = require("http");

var record_message = function(request,msg) {
 	console.log("received: " + msg);
};

http.createServer(function (request, response) {
	var content = "";
	request.addListener("body", function(chunk) {
		content += chunk;
	    });
	request.addListener("complete", function() {
		record_message(request, content);
		response.sendHeader(200, {"Content-Type": "text/plain"});
		response.sendBody("stored message (" + content.length + ")");
		response.finish();
	    });
    }).listen(8000);
