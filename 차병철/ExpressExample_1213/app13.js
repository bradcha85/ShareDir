var express = require('express')
, http = require('http')
, path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');


var multer = require('multer');
var fs = require('fs');

var app = express();
var expressErrorHandler = require('express-error-handler');

app.use(bodyParser.urlencoded({ extended:true}));



app.use(express.cookieParser());
app.use(expressSession({
    secret : 'my key' , 
    resave : true,
    saveUninitialized:true
	
}));
//multer 미들웨어 사용하기 
app.use(multer({
	
	dest : 'uploads' , 
	putSingleFilesInArray: true,
	limits:{
		files:10,
		fileSize: 1024 * 1024
	},
	rename: function(fieldname, filename){
		return filename+Date.now();
	},
	onFileUploadStart: function(file){
		console.log('파일 업로드 시작 : ' + file.originalname);
	},
	onFileUploadComplete: function(file, req, res) {
		console.log('파일 업로드 완료  : ' + file.fieldname + ' 어디있게? -> ' + file.path);
	},
	onFileSizeLimit: function (file){
		console.log('파일 크기 제한 초과 : %s' , file.originalname);
	}
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/process/product' , function(req, res){
	
	 console.log('/process/product 호출됨.');
	 
	 if(req.session.user){
	   
		 res.redirect('/product.html');
		 
	 }else{
		 
		 res.redirect('/login2.html');
	 }
});



app.post('/process/login' , function(req, res){
	
	console.log('/process/login 호출됨.');
	
	
	var paramId = req.param('id');
	var paramPassword = req.param('password');
	
	if(req.session.user){
		//이미 로그인된 상태 
		console.log('이미 로그인 되어 상품 페이지로 이동합니다. ');
		
		res.redirect('/product.html');
		
	}else{
		//세션 저장 
	    
		req.session.user = {
				
			id:paramId,
			name:'소녀시대',
			authorized:true
				
		};
       res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
       res.write('<h1>로그인 성공</h1>');
       res.write('<div><p>Param id : ' + paramId + '</p></div>');
       res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
       res.write('<br><br><a href="/process/product">상품 페이지로 이동하기 </a>');
       res.end();       
		 
		
	}
});



app.get('/process/logout' , function(req,res){
	
	
	console.log('/process/logout 호출됨. ');
	
	if(req.session.user){
		//로그인된 상태 
		console.log('로그아웃합니다.');
		req.session.destroy(function(err){
			
			if(err){throw err;}
			
			console.log('세션을 삭제하고 로그아웃되었습니다. ');
			res.redirect('/login2.html');
			
		});
		
	}else{
		//로그인 안된 상태
		console.log('아직 로그인되어 있지 않습니다. ');
		
		res.redirect('/login2.html');
		
	}
	
});



app.post('/process/photo' , function(req, res) {
	
	
	console.log('/process/photo 호출됨.');
	
	var files = req.files.photo;
	
	//현재의 파일 정보를 저장할 변수 선언 
	var originalname = '',
	            name = '',
	            mimetype ='',
	            size = 0;
	
	if(Array.isArray(files)){ //배열에 들어 있는 경우 
		console.log("배열에 들어 있는 파일 개수 : %d" , files.length);
		for(var index =0; index < files.length; index++){
			
			originalname=files[index].originalname;
			name=files[index].name;
			mimetype=files[index].mimetype;
			size=files[index].size;
		}
		
		originalname=files[index].originalname;
		name=files[index].name;
		mimetype=files[index].mimetype;
		size=files[index].size;
		
	}
	
	console.log('현재 파일 정보 : ' + originalname + ',' + name + ',' + mimetype + ',' + size);
	
	
	//클라이언트에 응답 전송 
	res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
    res.write('<h3> 파일 업로드 성공 </h3>');
    res.write('<hr/>');
    res.write('<p>원본 파일 이름 : ' + originalname + ' -> 저장 파일 이름 : ' + name + '</p>');
    res.write('<p>MIME TYPE : ' + mimetype + '</p>');
    res.write('<p>파일 크기 :' + size + '</p>');
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