package com.idk.movierecommendation.userwatchedmovie;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserTagCountRowMapper implements RowMapper<UserTagCountModel> {

    @Override
    public UserTagCountModel mapRow(ResultSet rs, int rowNum) throws SQLException{
        UserTagCountModel userTagCountModel = new UserTagCountModel();
        userTagCountModel.setTagId(rs.getInt(1));
        userTagCountModel.setCount(rs.getInt(2));
        return userTagCountModel;
    }
}
