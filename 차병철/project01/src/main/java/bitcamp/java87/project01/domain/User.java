package bitcamp.java87.project01.domain;

import java.sql.Date;



public class User {
	
	///Field
	private int userNo;
	private String userName;
	private String userPwd;
	private String userGender;
	private String userAge;
	private String userMail;
	private String userFilePath;
	private String userType;
	
	
	///Constructor
	public User(){
	}
		
	
	public int getUserNo() {
		return userNo;
	}


	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}



	public String getUserName() {
		return userName;
	}









	public void setUserName(String userName) {
		this.userName = userName;
	}









	public String getUserPwd() {
		return userPwd;
	}









	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}









	public String getUserGender() {
		return userGender;
	}









	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}









	public String getUserAge() {
		return userAge;
	}









	public void setUserAge(String userAge) {
		this.userAge = userAge;
	}









	public String getUserMail() {
		return userMail;
	}









	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}









	public String getUserFilePath() {
		return userFilePath;
	}









	public void setUserFilePath(String userFilePath) {
		this.userFilePath = userFilePath;
	}









	public String getUserType() {
		return userType;
	}









	public void setUserType(String userType) {
		this.userType = userType;
	}




	
	
	@Override
	public String toString() {
		return "User [userNo=" + userNo + ", userName=" + userName + ", userPwd=" + userPwd + ", userGender="
				+ userGender + ", userAge=" + userAge + ", userMail=" + userMail + ", userFilePath=" + userFilePath
				+ ", userType=" + userType + "]";
	}


	
}