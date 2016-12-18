//require  함수를 직접 만들고 직접 불러서 실행하기 모듈화하여 분리하기 전 
var require = function(path){
	
	var exports = {
       getUser : function(){
		  return { id: 'test01' , name: '소녀시대 '};
	  }, //end of getUser		
		group : {id : 'group01' , name : '친구'}	
			
	};//end of exports
	
	return exports;
	
};//end of require

var user = require('...');

function showUser(){
	return user.getUser().name + ' , ' + user.group.name;
}

console.log('사용자 정보  : %s ' , showUser());