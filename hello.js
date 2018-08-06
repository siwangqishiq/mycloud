var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');

var PORT = 3389;

//console.log('xxx.png = '+ mime.getType('xxx.png'));

http.createServer(
	function(req , res){
		console.log('req url = ' + req.url);
		if(req.url.startsWith('/img') || req.url.startsWith('/res')){
			handleRes(req , res);
		}else{
			res.setHeader('Content-Type',"text/html;charset=utf-8");
			res.end('404！！！！！！木哈哈哈哈');
		}
	}
).listen(PORT , function(){
	console.log('server is running on ' + PORT + ' ...');
});

function handleRes(req , res){
	fs.readFile(path.join(__dirname , req.url) , function(err , data){
		if(err){
			res.http = 404;
			res.end('404 not found resource');
			return;
		}

		res.setHeader('Content-Type' , mime.getType(req.url));
		res.end(data);
	});	
}
