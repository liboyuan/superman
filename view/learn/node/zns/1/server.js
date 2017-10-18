var http = require('http');

//request请求   response 响应
var server = http.createServer(function(req,resp){
  console.log(req.url)
  resp.write('avc')
  resp.end()

});
server.listen(8088);
