$(function() {

   
   $("#register_btn").on("click",function(){
	   $.colorbox({
		   iframe:"true",
		   href : "../interest/interestView.html",
		   width : "440px",
		   height : "700px"
	   });
   });
    
    $('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

});