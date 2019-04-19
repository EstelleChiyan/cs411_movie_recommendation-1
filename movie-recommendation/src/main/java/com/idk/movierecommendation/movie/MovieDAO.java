package com.idk.movierecommendation.movie;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MovieDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<MovieModel> getMovies() {
        String sql = "SELECT * FROM movie";
        List<MovieModel> moviesList = jdbcTemplate.query(sql, new MovieRowMapper());
        return moviesList;
    }

    public MovieModel getMovieById(int id) {
        String sql = "SELECT * FROM movie WHERE id=?";
        MovieModel movie = jdbcTemplate.queryForObject(sql, new MovieRowMapper(), id);
        return movie;
    }

    public MovieModel insertMovie(MovieModel movie) {
        String sql = "INSERT INTO movie VALUES(?,?,?,?,?,?,?)";
        int update = jdbcTemplate.update(sql, movie.getId(), movie.getTitle(), movie.getOverview(), movie.getPosterPath(),
                movie.getReleaseDate(), movie.getRuntime(), movie.getOriginalLanguage());
        if (update == 1) {
            System.out.printf("Movie %s is inserted\n", movie.getTitle());
        }
        return movie;
    }

    public MovieModel deleteMovieById(int id) {
        String selectSQL = "SELECT * FROM movie WHERE id=?";
        MovieModel movie = jdbcTemplate.queryForObject(selectSQL, new MovieRowMapper(), id);
        if (movie == null) {
            return null;
        }
        String deleteSQL = "DELETE FROM movie WHERE id=?";
        int update = jdbcTemplate.update(deleteSQL, id);
        if (update == 1) {
            System.out.printf("Movie %s is deleted\n", movie.getTitle());
        }
        return movie;
    }

    public MovieModel updateMovie(MovieModel movie){
        String updateSQL = "UPDATE movie SET title=?, overview=?, poster_path=?, release_date=?, runtime=?, original_language=? WHERE id=?";
        int update = jdbcTemplate.update(updateSQL, movie.getTitle(), movie.getOverview(), movie.getPosterPath(), movie.getReleaseDate(), movie.getRuntime(), movie.getOriginalLanguage(), movie.getId());
        if(update == 1){
            System.out.printf("Movie %s is updated\n", movie.getTitle());
        }
        return movie;
    }

    public Integer getMovieNumber() {
        String sql = "SELECT COUNT(*) AS number FROM movie";
        Integer number = jdbcTemplate.queryForObject(sql, new Object[]{}, Integer.class);
        return number;
    }

    public List<MovieModel> getMoviesByTag(int tagId) {
        String sql = "SELECT movie.id, movie.title, movie.overview, movie.poster_path, movie.release_date, movie.runtime, movie.original_language " +
                "FROM movie, movie_has_tag " +
                "WHERE movie.id = movie_has_tag.movie_id AND movie_has_tag.tag_id = ?";
        List<MovieModel> moviesList = jdbcTemplate.query(sql, new MovieRowMapper(), tagId);
        return moviesList;
    }

    public MovieModel getMovieByName(String moviename){
        String sql ="SELECT * FROM movie WHERE title=?";
        MovieModel ret = jdbcTemplate.queryForObject(sql, new MovieRowMapper(), moviename);
        return ret;
    }

    public List<MovieModel> getMatchMovies(String name){
        String sql="SELECT * FROM movie WHERE movie.title LIKE ?";
        return jdbcTemplate.query(sql, new MovieRowMapper(), "%" + name + "%");
    }
}
