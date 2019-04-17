package com.idk.movierecommendation.recommendation;

import com.idk.movierecommendation.movie.MovieModel;
import com.idk.movierecommendation.user.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class recommendation {

    static final int TAG_NUMBER = 10;

    @Autowired
    private UserDAO userDAO;

    // step 1: calculate the user preference vector according to the user's watching history.
    public void calculatePreferenceVector() {
        int[] preferenceVector = new int[TAG_NUMBER];

        // get the movies the user watched
        List<MovieModel> movies = null;

//        // calculate preference vector by iterating every movie
//        for (MovieModel movie : movies) {
//            for (Tag tag : movie.tags) {
//                preferenceVector[tag]++;
//            }
//        }
    }

    // step 2: retrieve movies * tags matrix


    // step 3: multiply each row in the matrix with the user preference vector to obtain top K movies
}
