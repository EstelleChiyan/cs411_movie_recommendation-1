package com.idk.movierecommendation.userwatchedmovie;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserWacthedMovieRowMapper implements RowMapper<UserWatchedMovieModel> {

    @Override
    public UserWatchedMovieModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserWatchedMovieModel userWatchedMovieModel = new UserWatchedMovieModel();
        userWatchedMovieModel.setUserId(rs.getInt("user_id"));
        userWatchedMovieModel.setMovieId(rs.getInt("movie_id"));
        return userWatchedMovieModel;
    }
}
