package bitcamp.java87.project01.domain;

import java.sql.Date;


public class Vote {
	
	private int voteNo;
	private int userNo;
	private String voteCategory;
	private String voteTitle;
	private String voteContent;
	private int voteHits;
	private Date endDate;
	private String voteType;
	private int voteMax;
	
	
	
	
	public Vote() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getVoteNo() {
		return voteNo;
	}
	public void setVoteNo(int voteNo) {
		this.voteNo = voteNo;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getVoteCategory() {
		return voteCategory;
	}
	public void setVoteCategory(String voteCategory) {
		this.voteCategory = voteCategory;
	}
	public String getVoteTitle() {
		return voteTitle;
	}
	public void setVoteTitle(String voteTitle) {
		this.voteTitle = voteTitle;
	}
	public String getVoteContent() {
		return voteContent;
	}
	public void setVoteContent(String voteContent) {
		this.voteContent = voteContent;
	}
	public int getVoteHits() {
		return voteHits;
	}
	public void setVoteHits(int voteHits) {
		this.voteHits = voteHits;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getVoteType() {
		return voteType;
	}
	public void setVoteType(String voteType) {
		this.voteType = voteType;
	}
	public int getVoteMax() {
		return voteMax;
	}
	public void setVoteMax(int voteMax) {
		this.voteMax = voteMax;
	}
	@Override
	public String toString() {
		return "Vote [voteNo=" + voteNo + ", userNo=" + userNo + ", voteCategory=" + voteCategory + ", voteTitle="
				+ voteTitle + ", voteContent=" + voteContent + ", voteHits=" + voteHits + ", endDate=" + endDate
				+ ", voteType=" + voteType + ", voteMax=" + voteMax + "]";
	}
	
   
	
	
	
}