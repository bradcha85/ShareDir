
//사용 패턴 : exports 에 속성으로 추가된 함수 객체를 그대로 참조 한 후 호출함 (함수를 할당하는 코드패턴)
var printUser = require('./user7').printUser;

printUser();

//require 메소드로 모듈을 불러들이면  user7의 export 자체가 참조된다. export의 printUSer 속성이 함수이므로
//모듈을 불러들이면서 그 속성을 바로 참조하면 할당한 변수 뒤에 () 표시로 직접 사용 할 수 있다. 
// =========만약 속성을 참조하지 않고 모듈만 불러들일시 ======== 
// var printUser = require('./user7');
// printUser.printUser(); 
// =================================================