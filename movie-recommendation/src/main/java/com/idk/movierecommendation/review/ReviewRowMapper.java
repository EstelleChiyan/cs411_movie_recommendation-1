//package com.idk.movierecommendation.review;
//
//import org.springframework.jdbc.core.RowMapper;
//
//import java.sql.ResultSet;
//import java.sql.SQLException;
//
//public class ReviewRowMapper implements RowMapper<ReviewModel>{
//    @Override
//    public ReviewModel mapRow(ResultSet rs, int rowNum) throws SQLException{
//
//        ReviewModel review = new ReviewModel();
//        review.setId(rs.getString("id"));
//        review.setContent(rs.getString("content"));
//        review.setPostDate(rs.getDate("post_date"));
//        review.setMoviesId(rs.getInt("movies_id"));
//        review.setUsersId(rs.getInt("users_id"));
//
//        return review;
//    }
//
//}
