var constants = require("./../constants");

	function execute(request) {
		var staticutil = require('./../staticutil');	
		var method = request.paths.splice(1,1);	
		method = method.length == 0 ? 'index' : method; // grr
		console.log("constructor: [home][" + method  + "]");
	
		staticutil.serveStaticFile({
			path 		: './public/templates/' + 'home' + '/' + method + '.ftl',
			callback 	: request.callback
		});	
	}

	function gettemplatedata(request) {
    	request.callback({
    		content : JSON.stringify({
    			title : "An unfinished but still (almost) working first stab at creating a node application", 
    			body  : "So rather than downloading an existing MVC framework, I thought I'd knock one up from scratch"
    			}),
    		status	: constants.HTTP_STATUS_OK,
    		type	: constants.CONTENT_TYPE_JSON
    	});	
	}

	function test(request) {
	    request.callback({
	    	content : 'that worked',
	    	status	: constants.HTTP_STATUS_OK,
	    	type	: constants.CONTENT_TYPE_HTML
	    });	
	}
	

exports.execute = execute;
exports.gettemplatedata = gettemplatedata;
exports.test = test;

