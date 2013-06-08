function execute(request) {

	var fs = require('fs');
	var staticutil = require('./../staticutil');
	var constants = require("./../constants");
	var method = request.paths.splice(1,1);	
	var method = method.length == 0 ? 'index' : method; // grr
	console.log("constructor: [home][" + method  + "]");
	
	/*
	 * Return some dummy data. Just to prove
	 * that we can alter response based on method
	 */
	
	function gettemplatedata() {
    	request.callback({
    		content : JSON.stringify({
    			title : "An unfinished but still (almost) working first stab at creating a node application", 
    			body  : "So rather than downloading an existing MVC framework, I thought I'd knock one up from scratch"
    			}),
    		status	: constants.HTTP_STATUS_OK,
    		type	: constants.CONTENT_TYPE_JSON
    	});	
	}
	
	/*
	 * Generic method to return a template specific
	 * to this controller. Could be in a controller helper method
	 */
	
	function returntemplate(controller, name) {
		staticutil.serveStaticFile({
			path 		: './public/templates/' + controller + '/' + name + '.ftl',
			callback 	: request.callback
		});	
	}
	
	/*
	 * this doesn't work. it should work. but it doesn't
	 * i can't find out why it doesn't work. this is annoying
	 
	switch(method) {
		case "gettemplatedata":
			gettemplatedata();		
			break;
		case '':
			returntemplate('index');
			break;
		default:
			returntemplate(method);
			break;
	}
	*/
    
    /*
     * Render response
     */
     
    if ("gettemplatedata" == method) {    		
    	gettemplatedata();    			
    } else {	
		returntemplate('home', method);
	}
	
	
}

exports.execute = execute;