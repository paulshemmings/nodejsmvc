var constants = require("./../constants");

	/*
	 * Welcome to the framework
	 */

	function index(request) {
	    request.callback({
	    	content : 'welcome to the node.js mvc framework.',
	    	status	: constants.HTTP_STATUS_OK,
	    	type	: constants.CONTENT_TYPE_HTML
	    });	
	}
	
/* 
 * Export the methods you want this controller to publish
 */	

exports.index = index;