package com.idk.movierecommendation.tag;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MovieHasTagRowMapper implements RowMapper<MovieHasTagModel> {

    @Override
    public MovieHasTagModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        MovieHasTagModel movieHasTagModel = new MovieHasTagModel();
        movieHasTagModel.setMovieId(rs.getInt("movie_id"));
        movieHasTagModel.setTagId(rs.getInt("tag_id"));
        return movieHasTagModel;
    }
}
