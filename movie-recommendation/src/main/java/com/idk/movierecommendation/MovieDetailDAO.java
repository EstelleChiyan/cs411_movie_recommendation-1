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

    public MovieDetailModel insertMovie(MovieDetailModel movie) {
        String sql = "INSERT INTO movies VALUES(?,?,?,?,?,?,?)";
        int update = jdbcTemplate.update(sql, movie.getId(), movie.getTitle(), movie.getOverview(), movie.getPosterPath(),
                movie.getReleaseDate(), movie.getRuntime(), movie.getOriginalLanguage());
        if (update == 1) {
            System.out.printf("Movie %s is inserted", movie.getTitle());
        }
        return movie;
    }

    public MovieDetailModel deleteMovieById(int id) {
        String selectSQL = "SELECT * FROM movies WHERE id=?";
        MovieDetailModel movie = jdbcTemplate.queryForObject(selectSQL, new MovieDetailRowMapper(), id);
        if (movie == null) {
            return null;
        }
        String deleteSQL = "DELETE FROM movies WHERE id=?";
        int update = jdbcTemplate.update(deleteSQL, id);
        if (update == 1) {
            System.out.printf("Movie %s is deleted", movie.getTitle());
        }
        return movie;
    }

    public void deleteMovieById(int id){
        String sql = "DELETE FROM movies WHERE id=?";
        int update = jdbcTemplate.update(sql, id);
        if(update == 1){
            System.out.printf("Movie %s removed", String.valueOf(id));
        }

    }
}
