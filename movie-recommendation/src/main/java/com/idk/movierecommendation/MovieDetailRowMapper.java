package com.idk.movierecommendation;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MovieDetailRowMapper implements RowMapper<MovieDetailModel> {

    @Override
    public MovieDetailModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        MovieDetailModel movie = new MovieDetailModel();
        movie.setId(rs.getInt("id"));
        movie.setTitle(rs.getString("title"));
        movie.setOverview(rs.getString("overview"));
        movie.setPosterPath(rs.getString("poster_path"));
        movie.setReleaseDate(rs.getDate("release_date"));
        movie.setOriginalLanguage(rs.getString("original_language"));

        return movie;
    }
}

