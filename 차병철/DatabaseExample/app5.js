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
var crypto = require('crypto');

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
		
		// user 스키마 및 모델 객체 생성  
		createUserSchema();
		
		// 스키마에 static 메소드 추가 
		UserSchema.static('findById', function(id, callback){
			return this.find({id : id} , callback);
		});

		UserSchema.static('findAll' , function(callback){
			return this.find({ }, callback);
		});
		
	});//end of database.on('open', function())
	
	database.on('disconnected' , connectDB);
}//end of connectDB





//user 스키마 및 모델 객체 생성 
function createUserSchema(){
	   
	//스키마 정의 
	//password를 hashed_password로 변경, default 속성 모두 추가, salt 속성 추가 
	UserSchema = mongoose.Schema({
		id : {type : String, required : true, unique : true , 'default' : ' '},
		hashed_password : {type : String, required:true , 'default' : ' '},
		salt : {type : String, required : true},
		name : {type : String, index : 'hashed' , 'default' : ' '},
		age : {type : Number, 'default' : -1},
		created_at : {type : Date, index : {unique : false} , 'default' : Date.now},
		updated_at : {type : Date, index : {unique : false} , 'default' : Date.now}
	});
	
	
	// info 를 virtual 메소드로 정의 
	UserSchema 
	   .virtual('password')
	   .set(function(password){
		   this._password = password;
		   this.salt = this.makeSalt();
		   this.hashed_password = this.encryptPassword(password);
		   console.log('virtual password 호출됨 :  ' + this.hashed_password);
	   })
	   .get(function(){return this._password});
	
	
	// 스키마에 모델 인스턴스에서 사용할 수 있는 메소드 추가 
	// 비밀번호 암호화 메소드 
	UserSchema.method('encryptPassword' , function(plainText , inSalt){
		if(inSalt){
			return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
		}else{
			return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
		}
		
	});
	
	
	//salt 값 만들기 메소드 
	UserSchema.method('makeSalt', function(){
		return Math.round((new Date().valueOf() * Math.random())) + '';
		console.log("makeSalt 호출됨.. ");
		
	});
	
	// 인증 메소드 - 입력된 비밀번호와 비교 (true/false 리턴)
	UserSchema.method('authenticate' , function(plainText, inSalt, hashed_password){
		console.log("authenticate 호출됨.. ");
		if(inSalt){
			console.log('authenticate 호출됨. : %s -> %s : %s' , plainText, 
								this.encryptPassword(plainText, inSalt), hashed_password);
			return this.encryptPassword(plainText, inSalt) === hashed_password;
			
		}else{
			console.log('authenticate 호출됨. : %s -> %s : %s' , plainText, 
					this.encryptPassword(plainText), this.hashed_password);
          return this.encryptPassword(plainText) === this.hashed_password;
		}
		
	});
	
	UserSchema.path('id').validate(function(id){
		return id.length;
	}, 'id 칼럼의 값이 없습니다. ');
	
	UserSchema.path('name').validate(function(name){
		return name.length;
	}, 'name 칼럼의 값이 없습니다. ');
	
} //end of createUserSchema


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

	   if(results.length>0){
		   console.log('아이디와 일치하는 사용자 찾음');
		   console.log(results);
	   
		   //2. 비밀번호 확인 : 모델 인스턴스 객체를 만들고 authenticate() 메소드 호출 
		  var user = new UserModel({id : id });
		  console.log('user 객체는 ? : ' + user);
		  var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
		                          
		  
		  if(authenticated){
			  console.log('비밀번호 일치함');
			  callback(null, results);
		  }else{
			  console.log('비밀번호 일치하지 않음.');
			  callback(null, null);
		  }
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
