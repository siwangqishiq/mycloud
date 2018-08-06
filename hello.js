var http = require('http');

http.createServer(
	function(req , res){
		console.log('req url = ' + req.url);
		res.setHeader('Content-Type',"text/html;charset=utf-8");
		res.end('SB!!! 呆逼方建');
	}
).listen(8888 , function(){
	console.log('server is running on 8888 ...');
});
