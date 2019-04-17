package com.idk.movierecommendation.reviews;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewsRowMapper implements RowMapper<ReviewsModel>{
    @Override
    public ReviewsModel mapRow(ResultSet rs, int rowNum) throws SQLException{

        ReviewsModel review = new ReviewsModel();

        review.setId(rs.getInt("id"));
        review.setContent(rs.getString("content"));
        review.setPostDate(rs.getDate("post_date"));
        review.setMovieId(rs.getInt("movies_id"));
        review.setUserId(rs.getInt("users_id"));

        return review;
    }

}
