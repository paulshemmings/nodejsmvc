function start() {

	/*
	 * Requires, and port definition
	 */
	
	var PORT= 8099;
	var http = require('http');
	var url  = require('url');
    var constants = require('./constants');
    var staticutil = require('./staticutil');
    
    /*
     * Return Static content from file server
     */
    		
	function serveStaticContent(request) {
		staticutil.serveStaticFile({
			path 		: "." + request.path,
			callback 	: request.callback
		});
	}
	
	/*
	 * Check if the controller exists. If it does use it render the response
	 * Otherwise return a 404.
	 */
	
	function serverDynamicContent(request) {
		var pathSections = request.path.split('/');
		var controllerName = pathSections.splice(1,1);
		var controllerPath = './controllers/' + controllerName;
		
		staticutil.checkFileExists(controllerPath + ".js", function(exists) {
			if(exists) {
				var controller = require('./controllers/' + controllerName);	
				controller.execute({
					request 	: request.request, 
					paths		: pathSections, 
					callback 	: request.callback
				});			
			 } else {
			 	request.callback({
			 		content		: 'invalid controller',
			 		status		: constants.HTTP_STATUS_NOT_FOUND,
			 		type		: constants.CONTENT_TYPE_PLAIN
			 	});
			 }
		});
	}
	
	/*
	 * Handle the HTTP request
	 */
	 
	function handleRequest(req, resp) {
	
		var requestPath = url.parse(req.url).pathname;
		console.log("serving: " + requestPath);
		
		 // assume that no URL with a . in it is looking for dynamic content.
		 // Hacky but works. 
		 
		 var contentBuilder;
		 if (requestPath.indexOf('.')==-1) {
		 	contentBuilder = serverDynamicContent;
		 } else {
		 	contentBuilder = serveStaticContent;
		 }
		 
		 // build and return content
		 
		 contentBuilder({
			path		: requestPath, 
			callback	: function(data){			
				console.log("return:[" + data.content.length + "][" + data.status + "][" + data.type["Content-Type"] + "]");
				resp.writeHead(data.status, data.type);
				resp.end(data.content);
			}		 	
		 });
		 
	}
	
	/*
	 * Listen to HTTP port
	 */

	http.createServer(handleRequest).listen(PORT);
};


exports.start = start;