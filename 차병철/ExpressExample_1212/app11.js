var express = require('express')
, http = require('http')
, path = require('path');

var cookieParser = require('cookie-parser');

var app = express();
var expressErrorHandler = require('express-error-handler');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.get('/process/showCookie' ,function(req,res){
	
	 console.log('/process/showCookie 호출됨. ');
	
	res.send(req.cookies);
});


app.get('/process/setUserCookie' , function(req,res){
	
	 console.log('/process/setUserCookie 호출됨. ');
	 
	 //쿠키 설정 
	 res.cookie('user' , {
		 
		 id: 'mike' , 
		 name : '소녀시대' , 
		 authorized : true
	 });
	
	 res.redirect('/process/showCookie');
});



var errorHandler = expressErrorHandler({
	
	static : {
		 '404' : './public/404.html'
	}
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler);


http.createServer(app).listen(3000, function(){
	console.log('Express 서버가 3000번 포트에서 시작됨.');
});