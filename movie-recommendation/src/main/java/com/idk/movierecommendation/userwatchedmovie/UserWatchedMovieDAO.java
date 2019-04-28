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

    public UserWatchedMovieModel insertUserWatchedMovie(UserWatchedMovieModel userWatchedMovieModel) {
        String sql = "INSERT INTO user_watched_movie VALUES(?,?)";
        int update = jdbcTemplate.update(sql, userWatchedMovieModel.getUserId(), userWatchedMovieModel.getMovieId());
        if (update == 1) {
            System.out.printf("User with id %s watched moive with id %s\n", userWatchedMovieModel.getUserId(), userWatchedMovieModel.getMovieId());
        }
        return userWatchedMovieModel;
    }
}