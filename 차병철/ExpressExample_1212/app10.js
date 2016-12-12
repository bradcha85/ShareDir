var express = require('express')
, http = require('http')
, path = require('path');

var bodyParser = require('body-parser');

var app = express();
var expressErrorHandler = require('express-error-handler');



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/process/users/:id' ,function(req,res){
	
	
	//토큰 정보를 가져옴 
    var paramId = req.params.id;
    
    console.log('/process/user와 토큰 %s를  사용해  처리함.' , paramId);
    
    res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p> Param id  : ' + paramId + '</p></div>');
    res.end();	
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