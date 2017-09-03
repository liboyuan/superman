var http = require('http');
var server = http.createServer(function(req,resp){
  if (req.url=='/1.html') {
  	resp.write('111')
  }else if(req.url=='/2.html'){
  	resp.write('222')
  }else{
  	resp.write('404')
  }
  
  resp.end()

});
server.listen(8088);
