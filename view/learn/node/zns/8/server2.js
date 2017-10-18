var express = require('express');
//读取静态文件
var expressStatic= require('express-static');
var server = express();

var users={
	'blue':123456,
	'lee':654321,
	'red':112233
}
server.use('/login',function(req,resp){
	//req.query 适用于get请求
	var use=req.query.user;
	var pass=req.query.pass;
	console.log(req.query)
	if (users[use]==null) {
		resp.send({'success':false,'msg':'用户不存在'});
	}else{
		if (users[use]!=pass) {
			resp.send({'success':false,'msg':'密码错误'})
		}else{
			resp.send({'success':true,'msg':'成功'})
		}
	}
	
	resp.end();
});
server.use(expressStatic('./www'));
server.listen(8888);