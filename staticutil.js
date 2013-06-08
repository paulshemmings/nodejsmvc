
	function checkFileExists(path, callback) {
		var fs = require('fs');
		fs.exists(path, function(exists) {
			callback(exists);
		});
	}
	
	function serveStaticFile(request) {
		var fs = require('fs');
		var constants = require('./constants');
    	fs.exists(request.path, function(exists) {
    		if (exists) {
				fs.readFile(request.path, function (err, data) {
    				if (err) {
	    				console.log("error loading: " + err);
        				request.callback({
        					content : "error", 
        					status  : constants.HTTP_STATUS_UNAUTHORIZED, 
        					type	: constants.CONTENT_TYPE_HTML
        				});
    				} else {
    					console.log("found file: " + request.path);
	    				request.callback({
	    					content : data, 
	    					status  : constants.HTTP_STATUS_OK, 
	    					type	: constants.CONTENT_TYPE_HTML
	    				});
    				}				
				});	    			
    		} else {
    			console.log("not exists: " + request.path);
    			request.callback({
    				content : "no data", 
    				status	: constants.HTTP_STATUS_NOT_FOUND, 
    				type	: constants.CONTENT_TYPE_HTML
    			});
    		}
    	});    	
	}
	
	exports.serveStaticFile = serveStaticFile;
	exports.checkFileExists = checkFileExists;