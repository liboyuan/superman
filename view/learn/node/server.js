var http = require('http');
var server = http.createServer(function(req,resp){
  console.log(req.url)
  resp.write('avc')
  resp.end()

});
server.listen(8088);
