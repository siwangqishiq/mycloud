var http = require('http');
var PORT = 3389;

http.createServer(
	function(req , res){
		console.log('req url = ' + req.url);
		res.setHeader('Content-Type',"text/html;charset=utf-8");
		res.end('SB!!! 呆逼方建');
	}
).listen(PORT , function(){
	console.log('server is running on ' + PORT + ' ...');
});
