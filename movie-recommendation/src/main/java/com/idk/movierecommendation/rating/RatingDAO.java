package com.idk.movierecommendation.rating;
import com.idk.movierecommendation.reviews.ReviewsModel;
import com.idk.movierecommendation.reviews.ReviewsRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository

public class RatingDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public RatingModel addRating(RatingModel ratingModel){
        String sql = "INSERT INTO rating VALUES(?,?,?,?)";
        int update = jdbcTemplate.update(sql, ratingModel.getRating(), ratingModel.getRating_date(), ratingModel.getMovie_id(), ratingModel.getUser_id());
        if (update == 1) {
            System.out.printf("Rating %s is posted", ratingModel.getRating());
        }
        return ratingModel;
    }

    public List<RatingModel> getRatingByMovieId(int movieId){
        String sql = "SELECT * FROM rating WHERE movies_id=?";
        List<RatingModel> ratingList = jdbcTemplate.query(sql, new RatingRowMapper(), movieId);
        return ratingList;
    }
}
