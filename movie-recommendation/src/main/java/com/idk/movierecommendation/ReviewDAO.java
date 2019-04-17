package com.idk.movierecommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ReviewDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ReviewModel getReviewById(String id) {
        String sql = "SELECT * FROM reviews WHERE id=?";
        ReviewModel review = jdbcTemplate.queryForObject(sql, new ReviewRowMapper(), id);
        return review;
    }

    public List<ReviewModel> getReviewByMovie(int movieId){
        String sql = "SELECT * FROM reviews WHERE movies_id=?";
        List<ReviewModel> reviewList = jdbcTemplate.query(sql, new ReviewRowMapper(), movieId);
        return reviewList;
    }

    public List<ReviewModel> getReviewByUser(int userId){
        String sql = "SELECT * FROM reviews WHERE users_id=?";
        List<ReviewModel> reviewList = jdbcTemplate.query(sql, new ReviewRowMapper(), userId);
        return reviewList;
    }

    public int getUserByName(String userName){
        String sql= "SELECT * FROM users WHERE username=?";
        UserModel userModel = jdbcTemplate.queryForObject(sql, new UserRowMapper(), userName);
        return userModel.getId();
    }

    public ReviewModel postReview(ReviewModel reviewModel){
        String sql = "INSERT INTO reviews VALUES(?,?,?,?,?)";
        int update = jdbcTemplate.update(sql, reviewModel.getId(), reviewModel.getContent(), reviewModel.getPostDate(), reviewModel.getMoviesId(), reviewModel.getUsersId());
        if (update == 1) {
            System.out.printf("Review %s is posted", reviewModel.getContent());
        }
        return reviewModel;
    }

    public ReviewModel deleteReviewById(String id) {
        String selectSQL = "SELECT * FROM reviews WHERE id=?";
        ReviewModel review = jdbcTemplate.queryForObject(selectSQL, new ReviewRowMapper(), id);
        if (review == null) {
            return null;
        }
        String deleteSQL = "DELETE FROM reviews WHERE id=?";
        int update = jdbcTemplate.update(deleteSQL, id);
//        if (update == 1) {
//            System.out.printf("Movie %s is deleted\n", review.getId());
//        }
        return review;
    }


    private String id;
    private String content;
    private Date postDate;
    private int moviesId;
    private int usersId;

    public ReviewModel updateReview(ReviewModel review){
        String updateSQL = "UPDATE reviews SET content=?, post_date=?, movies_id=?, users_id=? WHERE id=?";
        int update = jdbcTemplate.update(updateSQL, review.getContent(), review.getPostDate(), review.getMoviesId(), review.getUsersId(), review.getId());
//        if(update == 1){
//            System.out.printf("Movie %s is updated\n", movie.getTitle());
//        }
        return review;
    }
}
