var http=require('http');
var fs = require('fs');

var server = http.createServer(function(req,resp){
  var path='./www'+req.url;
  fs.readFile(path,function(err,data){
  	if (err) {
  		resp.write('404');
  	}else{
  		resp.write(data);
  	}
  	resp.end();
  });
  //resp.end(); end 不能写在这里
}).listen(8888);
console.log('服务已开启')
