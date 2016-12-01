package bitcamp.java87.project01.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java87.project01.domain.Page;
import bitcamp.java87.project01.domain.Search;
import bitcamp.java87.project01.domain.User;
import bitcamp.java87.project01.service.UserService;


@Controller
@RequestMapping("/user/*")
public class UserController {
	
	///Field
	@Autowired
	@Qualifier("userServiceImpl")
	private UserService userService;
		
	public UserController(){
		System.out.println(this.getClass());
	}
	
	@Value("#{commonProperties['pageUnit']}")
	int pageUnit;
	
	@Value("#{commonProperties['pageSize']}")
	int pageSize;
	
	
	//@RequestMapping("/addUserView.do")
	//public String addUserView() throws Exception {
	@RequestMapping( value="addUser", method=RequestMethod.GET )
	public String addUser() throws Exception{
	
		System.out.println("/user/addUser : GET");
		
		return "redirect:/user/addUserView.jsp";
	}
	
	//@RequestMapping("/addUser.do")
	@RequestMapping( value="addUser", method=RequestMethod.POST )
	public String addUser( @ModelAttribute("user") User user ) throws Exception {

		System.out.println("/user/addUser : POST");
		//Business Logic
		
		user.setUserGender("male");
		user.setUserAge("123");
	
		System.out.println("넘어온 user도메인객체값을 확인하자.. " + user);
		
		userService.addUser(user);
		
		return "forward:../loginAndSignUp/loginAndSignUpView.jsp";
	}
	
	//@RequestMapping("/getUser.do")
	@RequestMapping( value="getUser", method=RequestMethod.GET )
	public String getUser( @RequestParam("userId") String userId , Model model ) throws Exception {
		
		System.out.println("/user/getUser : GET");
		//Business Logic
		User user = userService.getUser(userId);
		model.addAttribute("user", user);
		
		return "forward:/user/getUser.jsp";
	}
	
	
	//@RequestMapping("/login.do")
		@RequestMapping( value="login", method=RequestMethod.POST )
		public String login(@ModelAttribute("user") User user , HttpSession session ) throws Exception{
			
			System.out.println("/user/login : POST");
			
		
			System.out.println("jsp 에서 받은 도메인객체 체크 :" + user);
			
			//Business Logic
			User dbUser=userService.getUser(user.getUserMail());
			
			System.out.println("서버에서 가져온 도메인객체 체크 : " + dbUser);
			System.out.println("서버에서 가져온 도메인객체의 pwd 체크!" + dbUser.getUserPwd());
			
	
			if( user.getUserPwd().equals(dbUser.getUserPwd())){
				session.setAttribute("user", dbUser);
				return "forward:../main/main.jsp";
			}
			
			return "redirect:../loginAndSignUp/loginAndSignUpView.jsp";
		}
		
/*		//@RequestMapping("/logout.do")
		@RequestMapping( value="logout", method=RequestMethod.GET )
		public String logout(HttpSession session ) throws Exception{
			
			System.out.println("/user/logout : POST");
			
			session.invalidate();
			
			return "redirect:/index.jsp";
		}*/
	
	
	
	
	
}