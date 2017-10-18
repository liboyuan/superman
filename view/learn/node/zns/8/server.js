var express=require('express');
var server=express();//创建服务
server.use('/',function(req,resp){
	resp.send({a:1,b:12});//可以输出对象 write()只能是字符串
	resp.end();
})
//server.get('/',function(req,resp){})
//server.post('/',function(req,resp){})
server.listen(8088);

