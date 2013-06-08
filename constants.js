function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false,
    	configurable: false
    });
}

define("HTTP_STATUS_OK", 200);
define("HTTP_STATUS_UNAUTHORIZED", 401);
define("HTTP_STATUS_NOT_FOUND", 404);


define("CONTENT_TYPE_PLAIN", {'Content-Type': 'text/plain'});
define("CONTENT_TYPE_HTML", {'Content-Type': 'text/html'});
define("CONTENT_TYPE_JSON", {'Content-Type': 'application/json'});
