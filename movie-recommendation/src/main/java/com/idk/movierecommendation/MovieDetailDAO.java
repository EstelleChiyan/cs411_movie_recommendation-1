package com.idk.movierecommendation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class MovieDetailDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<MovieDetailModel> getMovies() {
        String sql = "SELECT * FROM movies";
        List<MovieDetailModel> moviesList = jdbcTemplate.query(sql, new MovieDetailRowMapper());
        return moviesList;
    }

    public MovieDetailModel getMovieById(int id) {
        String sql = "SELECT * FROM movies WHERE id=?";
        MovieDetailModel movie = jdbcTemplate.queryForObject(sql, new MovieDetailRowMapper(), id);
        return movie;
    }

    public void insertMovie(MovieDetailModel movie) {
        String sql = "INSERT INTO movies VALUES(?,?,?,?,?,?)";
        int update = jdbcTemplate.update(sql, movie.getId(), movie.getTitle(), movie.getOverview(), movie.getPosterPath(),
                movie.getReleaseDate(), movie.getOriginalLanguage());
        if (update == 1) {
            System.out.printf("Movie %s inserted", movie.getTitle());
        }
    }

    public void deleteMovieById(int id){
        String sql = "DELETE FROM movies WHERE id=?";
        int update = jdbcTemplate.update(sql, id);
        if(update == 1){
            System.out.printf("Movie %s removed", String.valueOf(id));
        }

    }
}
