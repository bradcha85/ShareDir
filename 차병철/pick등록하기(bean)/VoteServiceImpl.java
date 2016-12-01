package bitcamp.java87.project01.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import bitcamp.java87.project01.dao.VoteDao;
import bitcamp.java87.project01.domain.Vote;
import bitcamp.java87.project01.service.VoteService;


@Service("voteServiceImpl")
public class VoteServiceImpl implements VoteService{
	
	///Field
	@Autowired
	@Qualifier("voteDaoImpl")
	private VoteDao voteDao;
	
	public void setVoteDao(VoteDao voteDao) { 
		this.voteDao = voteDao;
	}
	
	///Constructor
	public VoteServiceImpl() {
		System.out.println(this.getClass());
	}

	///Method
	public void addVote(Vote vote) throws Exception {
	      voteDao.addVote(vote);
	}
//
//	public User getUser(String userId) throws Exception {
//		return userDao.getUser(userId);
//	}

	/*public Map<String , Object > getProductList(Search search) throws Exception {
		List<Product> list= productDao.getProductList(search);
		int totalCount = productDao.getTotalCount(search);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list );
		map.put("totalCount", new Integer(totalCount));
		
		return map;
	}

	@Override
	public Product getProduct(int prodNo) throws Exception {
		// TODO Auto-generated method stub
		return productDao.getProduct(prodNo);
	}

	@Override
	public void updateProduct(Product product) throws Exception {
		// TODO Auto-generated method stub
		productDao.updateProduct(product);
	}*/


}