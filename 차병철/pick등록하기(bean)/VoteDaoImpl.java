package bitcamp.java87.project01.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import bitcamp.java87.project01.dao.ProductDao;
import bitcamp.java87.project01.dao.VoteDao;
import bitcamp.java87.project01.domain.Vote;


@Repository("voteDaoImpl")
public class VoteDaoImpl implements VoteDao{
	
	///Field
	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSession sqlSession;
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	///Constructor
	public VoteDaoImpl() {
		System.out.println(this.getClass());
	}

//	///Method
	public void addVote(Vote vote) throws Exception {
		System.out.println("여기는 daoImple, 도메인객체 값확인"+vote);
		sqlSession.insert("VoteMapper.addVote", vote);
	}


	
	
}