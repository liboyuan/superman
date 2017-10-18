var http = require('http');
var querystring = require('querystring');
http.createServer(function(req, resp) {
    var str = '';
    var i = 0;
    req.on('data', function(data) {
        console.log(`第 ${ i++ } 次`);
        str += data;
    });
    req.on('end', function() {
        //console.log(str);
        var json = querystring.parse(str);
        console.log(json)
    })

}).listen(8888);