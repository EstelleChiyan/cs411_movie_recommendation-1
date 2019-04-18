package com.idk.movierecommendation.movie;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MovieRowMapper implements RowMapper<MovieModel> {

    @Override
    public MovieModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        MovieModel movie = new MovieModel();
        movie.setId(rs.getInt("id"));
        movie.setTitle(rs.getString("title"));
        movie.setOverview(rs.getString("overview"));
        movie.setPosterPath(rs.getString("poster_path"));
        movie.setReleaseDate(rs.getDate("release_date"));
        movie.setRuntime(rs.getInt("runtime"));
        movie.setOriginalLanguage(rs.getString("original_language"));
        return movie;
    }
}

