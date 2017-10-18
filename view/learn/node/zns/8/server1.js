var express = require('express');
var server = express();
/*server.use('/',function(req,resp){
	resp.send('use');
	resp.end();
	console.log('use')
});*/
server.get('/',function(req,resp){
	/*resp.send('get');
	resp.end();*/
	console.log('get')
});
server.post('/',function(req,resp){
	/*resp.send('post');
	resp.end();*/
	console.log('post')
});
server.listen(8888);