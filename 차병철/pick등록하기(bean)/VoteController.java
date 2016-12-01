package bitcamp.java87.project01.controller;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
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
import bitcamp.java87.project01.domain.Product;
import bitcamp.java87.project01.domain.Search;
import bitcamp.java87.project01.domain.User;
import bitcamp.java87.project01.domain.Vote;
import bitcamp.java87.project01.service.VoteService;


@Controller
@RequestMapping("/vote/*") // 
public class VoteController {
	
	///Field
	@Autowired
	@Qualifier("voteServiceImpl")
	private VoteService voteService;
		
	public VoteController(){
		System.out.println(this.getClass());
	}
	
	@Value("#{commonProperties['pageUnit']}")
	int pageUnit;
	
	@Value("#{commonProperties['pageSize']}")
	int pageSize; 
	
	
	@RequestMapping( value="addVote", method=RequestMethod.POST )
	public String addVote( @ModelAttribute("vote") Vote vote ) throws Exception {

		System.out.println("voteController...");
	
		vote.setUserNo(10001);
		vote.setVoteCategory("sports");
		vote.setVoteTitle("축구vs야구");
		vote.setVoteContent("주말에어떤스포츠를할까요?");
		vote.setVoteHits(15);
		vote.setVoteType("vs");
		vote.setVoteMax(1);
		
		
		voteService.addVote(vote);
		
		return "redirect:/user/loginView.jsp";
	}
	
	
}
