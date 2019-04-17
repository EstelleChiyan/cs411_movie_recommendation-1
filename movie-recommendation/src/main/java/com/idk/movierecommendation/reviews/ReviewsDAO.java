package com.idk.movierecommendation.reviews;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ReviewsDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ReviewsModel getReviewById(int id) {
        String sql = "SELECT * FROM reviews WHERE id=?";
        ReviewsModel review = jdbcTemplate.queryForObject(sql, new ReviewsRowMapper(), id);
        return review;
    }

    public List<ReviewsModel> getReviewByMovieId(int movieId){
        String sql = "SELECT * FROM reviews WHERE movies_id=?";
        List<ReviewsModel> reviewList = jdbcTemplate.query(sql, new ReviewsRowMapper(), movieId);
        return reviewList;
    }

    public List<ReviewsModel> getReviewByUserId(int userId){
        String sql = "SELECT * FROM reviews WHERE users_id=?";
        List<ReviewsModel> reviewList = jdbcTemplate.query(sql, new ReviewsRowMapper(), userId);
        return reviewList;
    }

    public ReviewsModel insertReview(ReviewsModel reviewsModel){
        String sql = "INSERT INTO reviews VALUES(?,?,?,?,?)";
        int update = jdbcTemplate.update(sql, reviewsModel.getId(), reviewsModel.getContent(), reviewsModel.getPostDate(), reviewsModel.getMovieId(), reviewsModel.getUserId());
        if (update == 1) {
            System.out.printf("Review %s is posted", reviewsModel.getContent());
        }
        return reviewsModel;
    }

    public ReviewsModel deleteReviewById(int id) {
        String selectSQL = "SELECT * FROM reviews WHERE id=?";
        ReviewsModel review = jdbcTemplate.queryForObject(selectSQL, new ReviewsRowMapper(), id);
        if (review == null) {
            return null;
        }
        String deleteSQL = "DELETE FROM reviews WHERE id=?";
        int update = jdbcTemplate.update(deleteSQL, id);
        if (update == 1) {
            System.out.printf("Movie %s is deleted\n", review.getId());
        }
        return review;
    }

    public ReviewsModel updateReviewById(ReviewsModel reviewsModel) {
        String updateSQL = "UPDATE reviews SET content=?, post_date=?, movies_id=?, users_id=? WHERE id=?";
        int update = jdbcTemplate.update(updateSQL, reviewsModel.getContent(), reviewsModel.getPostDate(), reviewsModel.getMovieId(), reviewsModel.getUserId(), reviewsModel.getId());
        if(update == 1){
            System.out.printf("reviews with id %d is updated\n", reviewsModel.getId());
        }
        return reviewsModel;
    }
}
