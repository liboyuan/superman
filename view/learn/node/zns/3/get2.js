var http = require('http');
var urlLib = require('url');

http.createServer(function(req, resp) {
    var urlObj=urlLib.parse(req.url,true);
    var pathName=urlObj.pathname;
    var query=urlObj.query;

    console.log(pathName,query);
    resp.write('ok');
    resp.end();

}).listen(8888);