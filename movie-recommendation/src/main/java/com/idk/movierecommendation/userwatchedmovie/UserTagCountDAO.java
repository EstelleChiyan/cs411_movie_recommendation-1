package com.idk.movierecommendation.userwatchedmovie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserTagCountDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UserTagCountModel> getUserTagCountList(String username) {
        String sql = "SELECT movie_has_tag.tag_id, COUNT(movie_has_tag.tag_id) " +
                "FROM users, user_watched_movie, movie_has_tag " +
                "WHERE users.username = ? AND users.id = user_watched_movie.user_id " +
                "AND movie_has_tag.movie_id = user_watched_movie.movie_id " +
                "GROUP BY movie_has_tag.tag_id;";

        List<UserTagCountModel> userTagCountList = jdbcTemplate.query(sql, new UserTagCountRowMapper(), username);
        return userTagCountList;
    }
}
