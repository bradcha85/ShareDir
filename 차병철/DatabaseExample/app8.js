
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var mysql = require('mysql');

//===== Express 서버 객체 만들기 =====//
var app = express();

//===== MySQL 데이터베이스를 사용할 수 있는 mysql 모듈 불러오기  =====//
var mysql = require('mysql');

//===== MySQL 데이터베이스 연결 설정 =====//
var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost' , 
    user : 'root' ,
    password : 'root',
    database : 'test',
    debug : false
});

// 사용자를 등록하는 함수 
var addUser = function(id, name, age , password, callback){
	console.log('addUser 호출됨.');
	
	//커넥션 풀에서 연결 객체를 가져오기
	pool.getConnection(function(err,conn) {
		if(err){
			conn.release(); // 반드시 해제해야함
		 return;
	   }
	   console.log('테이터베이스 연결 스레드 아이디 : ' + conn.threadId);
	
	   //데이터를 객체로 만들기
	   var data = {id:id, name:name, age:age, password:password};
	   
	   // SQL문 실행
	   var exec = conn.query('insert into users set?', data , function(err,result){
		   conn.release();
		   console.log('실행 대상 SQL : ' + exec.sql);
		   
		   if(err){
			   console.log('SQL 실행 시 오류 발생함.');
			   console.dir(err);
			   
			   callback(err , null);
			   
			   return;
		       }
	         callback(null, result);	   
	       });
	
	
	});

};



var authUser = function(id, password, callback){
	
	console.log("authUSer 호출됨. ");
	
	
	 //커넥션 풀에서 연결 객체를 가져옵니다. 
     pool.getConnection(function(err,conn){
        
    	  if(err){
    		  conn.release(); //반드시 해제할것. 
    		  return;
    	  }
    	 
    	 console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    	 
    	 var columns = ['id' , 'name' , 'age'];
    	 var tablename = 'users';
    	 
    	 //SQL 실행 
    	 var exec = conn.query("select ?? from ?? where id = ? and password = ?",
    			 					[columns, tablename , id ,password] , function(err,rows){
    		 
    		 conn.release();
    		 console.log('실행대상 SQL :' + exec.sql );
    		 
    		 if(rows.length > 0){
    			 console.log('아이디 [%s] , 패스워드 [%s] 가 일치하는 사용자 찾음. ' , id, password);
    			 callback(null, rows);
    		 }else{
    			 console.log("일치하는 사용자를 찾지 못함. ");
    			 callback(null,null);
    		 }
    	 });			
     });
};



//===== 서버 변수 설정 및 static으로 public 폴더 설정 =====//
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


//===== body-parser , cookie-parser , express-sesion 사용 설정 =====//
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
	    secret:'my key',
	    resave:true,
	    saveUninitialized:true
}));

/*//===== 404 오류 페이지 처리 ===== // 
var errorHandler = expressErrorHandler({
	
	static:{
		'404': './public/404.html'
	}
});*/

/*app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);*/

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.post('/process/adduser' , function(req, res){
	console.log('/process/adduser 호출됨.');
	
	var paramId =req.param('id');
	var paramName =req.param('name');
	var paramAge = req.param('age');
	var paramPassword = req.param('password');
	
	if(pool){
	 addUser(paramId, paramName, paramAge, paramPassword, function(err, result){
		 
		 if(err){throw err;}
		 if (result){
			 console.dir(result);
			 
			 console.log('inserted' + result.affectedRows + 'rows');
			 
			  var insertId = result.insertId;
			  console.log('추가한 레코드의 아이디 : ' + insertId);
			  
			  res.writeHead('200' , {'Content-Type':'text/html;charset=utf8'});
			  res.write('<h2>사용자 추가 성공</h2>');
			  res.end();
		 }else {
			  res.writeHead('200' , {'Content-Type':'text/html;charset=utf8'});
			  res.write('<h2>사용자 추가 실패</h2>');
			  res.end();
		 }
	 });	
	
	}else{
		  res.writeHead('200' , {'Content-Type':'text/html;charset=utf8'});
		  res.write('<h2>데이터베이스 연결 실패</h2>');
		  res.end();
	}
});



app.post('/process/login' , function(req,res){

	
	  console.log("/process/login 호출됨");
			  
	  var paramId = req.param('id');
	  var paramPassword =req.param('password');
	  
	  if(pool){
		  authUser(paramId, paramPassword, function(err,rows){
			if(err){throw err;}
			
			if(rows){
				console.dir(rows);
				
				var username = rows[0].name;
				
				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write('<br><br><a href="/public/login2.html">다시 로그인하기</a>');
			    res.end();
			}
			  
			  
		  })
		  
		  
	  }
	
	
	
})






	
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
	

