/*
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var app = express();

//몽고db
var mongodb = require('mongodb');

//mongoose 모듈 불러들이기 
var mongoose = require('mongoose');

//=== 데이터베이스 연결 ===//
var database; 
var UserSchema; 
var UserModel; 

// 데이터베이스에 연결하고 응답 객체의 속성으로 db객체 추가 
function connectDB() {
	 
	//데이터베이스 연결 정보 
	var databaseUrl = 'mongodb://localhost:27017/shopping';
	
	//데이터베이스 연결 
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	
	database.on('error' , console.error.bind(console , 'mongoose cocnnection error.'));
	database.on('open' , function(){
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
		
		// 스키마 정의 
		UserSchema = mongoose.Schema({
			id: {type : String,  required : true , unique : true},
			password : {type : String , required : true} , 
			name : {type: String , index : 'hashed' } ,
			age : {type: Number , 'default' : -1},
			created_at : {type : Date, index : {unique : false} , 'default'  : Date.now},
			updated_at : {type : Date, index : {unique : false} , 'default'  : Date.now},
		}); // end of UserSchema
		
		
		// 스키마에 static 메소드 추가 
		UserSchema.static('findById', function(id, callback){
			return this.find({id : id} , callback);
		});

		UserSchema.static('findAll' , function(callback){
			return this.find({ }, callback);
		});
		
		console.log("UserSchema 정의함.");
		
		//User 모델 정의 
		UserModel = mongoose.model("users2" , UserSchema);
		console.log('UserModel 정의함. ');
		
	});//end of database
	database.on('disconnected' , connectDB);
}//end of connectDB







//사용자를 인증하는 함수 
var authUser = function(database , id, password, callback){
   console.log('authUser 호출됨');
	
   //1. 아이디를 사용해 검색 
   UserModel.findById(id, function(err,results){
	   if(err){
		   callback(err,null);
		   return;
	   }
	   
	   console.log('아이디 [%s] 로 사용자 검색 결과', id );
	   console.dir(results);
	   
	   if(results.length>0){
		   console.log('아이디와 일치하는 사용자 찾음');
	   
		   //2. 비밀번호 확인 
		   if(results[0]._doc.password ==password){
			 console.log('비밀번호 일치함');
			 callback(null, results);
			 
		 }else{
			 console.log('비밀번호 일치하지 않음 ');
			 callback(null, null);
		 } 
		   
	   } //end of if(results.length)
	   else {
		   console.log("아이디와 일치하는 사용자를 찾지 못함. ");
		   callback(null, null);
	   }
	   
   });//end of UserModel.find

};//end of authUser


//사용자를 등록하는 함수 
var addUser = function(database, id, password, name, callback){
    console.log('addUser 호출됨. ');
    
   // UserModel의 인스턴스 생성 
    var user = new UserModel({"id": id, "password" : password, "name" : name});
	
   //save() 로 저장 
    user.save(function(err){
    	if(err){
    		callback(err,null);
    		return;
    	}
    	console.log("사용자 데이터 추가함.");
    	callback(null, user);
    	
    });//end of user.save
    
};//end of addUSer

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//=== body-parser , cookie-parser ,express-session 사용 설정 ===== //
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(expressSession({
	     secret : 'my key',
	     resave : true,
	     saveUninitialized:true
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//로그인
app.post('/process/login' , function(req,res){
	
	console.log('/process/login 호출됨. ');
	
	var paramId = req.param('id');
	var paramPassword = req.param('password');
	
	if(database){
	  authUser(database, paramId, paramPassword, function(err, docs){
		   
		 if(err){throw err;}
		 
		 if(docs){
			 console.dir(docs);
			 
			 res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
			 res.write('<h1>로그인 성공</h1>');
			 res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
			 res.write('<div><p>사용자 비번 : ' +  paramPassword + '</p></div>');
			 res.write('<br><br><a href="/public/login.html">다시 로그인하지</a>');
			 res.end();
		 }//end of if
		 else {
			 res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
			 res.write('<h1>로그인 실패</h1>');
			 res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오.</p></div>');
			 res.write('<br><br><a href="/public/login.html">다시 로그인하지</a>');
			 res.end();
		 }//end of else
	  });//end of authUser
		
	}//end of if(database)
	else{
		 res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
		 res.write('<h2>데이터베이스  연결 실패</h2>');
		 res.write('<div><p>데이터베이스에 연결하지 못했습니다. </p></div>');
		 res.end();	
	}
});//end of app.post (로그인)


//사용자 추가 
app.post('/process/adduser' , function(req,res){
	console.log('/process/adduser 호출됨. ');
	
	var paramId = req.param('id');
	var paramPassword = req.param('password');
	var paramName = req.param('name');
	
	if(database){
		addUser(database, paramId, paramPassword, paramName, function(err,result){
		 if(err){throw err;}
		 
		 if(result){
			 console.dir(result);
			 res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
			 res.write('<h2>사용자 추가 성공 </h2>');
			 res.end();
			 
		 }else{
			 res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
			 res.write('<h2>사용자 추가 실패</h2>');
			 res.end();
		 }
		});//end of addUser 
		
	}//end of if(database)
	else{
		 res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
		 res.write('<h2>데이터베이스 연결 실패</h2>');
		 res.end();
	}
 }); //end of app.pose(사용자 추가)


app.post('/process/listuser' , function(req,res){

	console.log('/process/listuser 호출됨.');
	
	if(database){
	  // 1. 모든 사용자 검색
	  UserModel.findAll(function(err,results){
		  if(err){
			  callback(err, null);
			  return;
		  }
		  
		  if(results){
			  console.dir(results);
			  
			  res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
			  res.write('<h2>사용자 리스트</h2>');
			  res.write('<div><ul>');
			  
			  for(var i = 0 ; i < results.length; i++){
				  var curId = results[i]._doc.id;
				  var curName = results[i]._doc.name;
				  res.write(' <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
			  }//end of for
			  
			  res.write('</ul></div>');
			  res.end();
		  } else { 
			  res.writeHead('200' , {'Content-Type' : 'text/html;charset=utf8'});
			  res.write('<h2>사용자 리스트 조회 실패</h2>');
			  res.end();
 		  }
		  
		  
		  
		  
	  });//end of UserModel.findAll
		
	}//end of if(database)
	
	
})









//=== 404 오류 페이지 처리 === // 
var errorHandler = expressErrorHandler({
	
	static : {
		'404' : './public/404.html'
	}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//=== 서버 시작 === //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
 
  //데이터베이스 연결 
  connectDB();
});
