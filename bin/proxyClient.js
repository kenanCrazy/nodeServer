var http = require('http');
var httpProxy = require('http-proxy');


//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({target:'http://39.106.67.112'}).listen(80); // See (†)
http.get()