package com.idk.movierecommendation.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MovieHasTagDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<MovieHasTagModel> getAllMovieHasTag() {
        String sql = "SELECT * FROM movie_has_tag";
        List<MovieHasTagModel> movieHasTagList = jdbcTemplate.query(sql, new MovieHasTagRowMapper());
        return movieHasTagList;
    }
}
