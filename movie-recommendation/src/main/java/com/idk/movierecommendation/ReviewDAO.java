package com.idk.movierecommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ReviewDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ReviewModel> getReviewByMovie(int movieId){
        String sql = "SELECT * FROM reviews WHERE movies_id=?";
        List<ReviewModel> reviewList = jdbcTemplate.query(sql, new ReviewRowMapper(), movieId);
        return reviewList;
    }

    public ReviewModel postReview(ReviewModel reviewModel){
        String sql = "INSERT INTO reviews VALUES(?,?,?,?,?)";
        int update = jdbcTemplate.update(sql, reviewModel.getId(), reviewModel.getContent(), reviewModel.getPostDate(), reviewModel.getMoviesId(), reviewModel.getUsersId());
        if (update == 1) {
            System.out.printf("Review %s is posted", reviewModel.getContent());
        }
        return reviewModel;
    }
}
