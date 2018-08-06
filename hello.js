var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
const URL = require('url');

//var PORT = 8080;
var PORT = 8080;

//console.log('xxx.png = '+ mime.getType('xxx.png'));

http.createServer(
	function(req , res){
		console.log('req url = ' + req.url);
		var path = URL.parse(req.url).pathname;
		if(path.startsWith('/html')){
			handleHtml(path , req , res);
		}else if(path.startsWith('/img') || path.startsWith('/res')){
			handleRes(path , req , res);
		}else{
			res.setHeader('Content-Type',"text/html;charset=utf-8");
			res.end('404！！！！！！木哈哈哈哈');
		}
		// switch(path){
		// 	case '/html':
		// 		break;
		// 	case '/img':
		// 	case '/res':
		// 		break;
		// 	default:
		// 		break;
		// }
	}
).listen(PORT , function(){
	console.log('server is running on ' + PORT + ' ...');
});

function handleRes(url , req , res){
	fs.readFile(path.join(__dirname , url) , function(err , data){
		if(err){
			res.http = 404;
			res.end('404 not found resource');
			return;
		}

		res.setHeader('Content-Type' , mime.getType(url));
		res.end(data);
	});	
}

function handleHtml(url , req , res){
	fs.readFile(path.join(__dirname , url) ,'utf8', function(err , data){
		if(err){
			res.http = 404;
			res.end('404 not found!');
			return;
		}
		
		res.setHeader('Content-Type' , mime.getType(url));
		res.end(data);
	});
}
