package com.idk.movierecommendation.userwatchedmovie;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserWatchedMovieDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UserWatchedMovieModel> getUserWatchedMovieList(String userId) {
        String sql = "SELECT * FROM user_watched_movie WHERE user_id = ?";
        List<UserWatchedMovieModel> userWatchedMovieList = jdbcTemplate.query(sql, new UserWacthedMovieRowMapper(), userId);
        return userWatchedMovieList;
    }
}