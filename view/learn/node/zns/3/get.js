var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, resp) {
    var get = {};
    var url = req.url;
    var url2 = '';
    console.log(url);
    if (url.indexOf('?') != -1) {
        var arr = url.split('?');
        get = querystring.parse(arr[1]);
        url2 = arr[0];
    } else {
        url2 = req.url;
    }

    console.log(url2, get);

    resp.write('ok');
    resp.end();

}).listen(8888);