var user = require('./user6(afterModule)');

function showUser(){
	return user.getUser().name + ' , ' + user.group.name;
}

console.log('사용자 정보  : %s ' , showUser());