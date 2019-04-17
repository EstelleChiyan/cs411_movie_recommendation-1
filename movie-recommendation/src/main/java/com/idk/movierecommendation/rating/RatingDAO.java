package com.idk.movierecommendation.rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository

public class RatingDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public RatingModel postRating(RatingModel ratingModel){
        String sql = "INSERT INTO rating VALUES(?,?,?,?)";
        int update = jdbcTemplate.update(sql, ratingModel.getRating(),ratingModel.getRating_date(),ratingModel.getMovies_id(),ratingModel.getUsers_id());

        return ratingModel;
    }
}
