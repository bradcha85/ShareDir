<%@page contentType="text/html; charset=utf-8" %>
<html>
<head>
<meta charset="UTF-8">
<title>Material Compact Login Animation</title>

  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">

  <link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900'>
<link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Montserrat:400,700'>
<link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
<link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900&subset=latin,latin-ext'>
<link rel="stylesheet" href="/css/loginAndSignUpView.css">
<link rel="stylesheet" href="/css/jquery-colorbox/colorbox.css">

</head>

<body>
           
    <div class="container">
  <div class="info">
    <h1>Welcome</h1><span>Made with <i class="fa fa-heart"></i> by <a href="http://andytran.me">brad cha</a></span>
  </div>
</div>
<div class="form">
  <div class="thumbnail"><img src="/images/W_pick.png"></div>
  <form name="addUser" aria-describedby="" class="register-form" method="post">
    <input type="text" name="userMail"placeholder="email"/>
    <input type="password" name="userPwd" placeholder="password"/>
    <input type="password" placeholder="password confirm"/>
      <button id="register_btn"><a href="javascript:AddUser();">create</a></button>
    <p class="message">Already registered? <a href="#">Sign In</a></p>
  </form>
  <form name="login" class="login-form" method="post">
    <input type="text" name="userMail" placeholder="email"/>
    <input type="password" name="userPwd" placeholder="password"/>
    <button id="login_btn">login</button>
    <p class="message">Not registered? <a href="#">Create an account</a></p>
  </form>
</div>

      <!-- 페이지 이동 테스트 -->
  <!--  <a href="javascript:AddUser();">create</a>  -->
   
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
	  <script src="/javascript/jquery.colorbox-min.js"></script>
	<script src="javascript/loginAndSignUpView.js"></script>
    
    <script type="text/javascript">
     
    
    
    
     function AddUser(){
    	 alert("회원가입");
       console.log("회원가입");
        
     document.addUser.action='/user/addUser';
     document.addUser.submit();
     }
    
     
     /* function Login(){
    	alert("로그인");
    	document.login.action='/user/login';
    	document.login.submit();
     } 
     */
  
     $("#login_btn").click(function () {
 
    	    console.log("login");       	 
    	    document.login.action='/user/login';
    	    document.login.submit();
    	   
      });
    
     
     
     
     </script>
    
    
    

</body>
</html>
