package com.idk.movierecommendation.rating;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RatingRowMapper implements  RowMapper<RatingModel>{
    @Override
    public RatingModel mapRow(ResultSet rs, int rowNum) throws SQLException{
        RatingModel rating=new RatingModel();
        rating.setRating(rs.getInt("rating"));
        rating.setRating_date(rs.getDate("rating_date"));
        rating.setMovies_id(rs.getInt("movies_id"));
        rating.setUsers_id(rs.getInt("users_id"));
        return rating;
    }

}
