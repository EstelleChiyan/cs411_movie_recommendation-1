package com.idk.movierecommendation.recommendation;


import com.idk.movierecommendation.movie.MovieDAO;
import com.idk.movierecommendation.movie.MovieModel;
import com.idk.movierecommendation.tag.MovieHasTagDAO;
import com.idk.movierecommendation.tag.MovieHasTagModel;
import com.idk.movierecommendation.user.UserDAO;
import com.idk.movierecommendation.userwatchedmovie.UserTagCountDAO;
import com.idk.movierecommendation.userwatchedmovie.UserTagCountModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.PriorityQueue;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    @GetMapping("/{username}")
    public List<MovieModel> getRecommendedMovies(@PathVariable(name = "username") String username) {
        return findMovies(username);
    }

    int NUM_OF_TAG = 19;
    int NUM_OF_MOVIE;
    String username;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private MovieDAO movieDAO;

    @Autowired
    private UserTagCountDAO userTagCountDAO;

    @Autowired
    private MovieHasTagDAO movieHasTagDAO;

    // step 1: calculate the user preference vector according to the user's watching history.
    public int[] calculatePreferenceVector() {
        int[] preferenceVector = new int[NUM_OF_TAG];

        // get the count of each tag for movies the user watched
        List<UserTagCountModel> list = userTagCountDAO.getUserTagCountList(this.username);

        // calculate preference vector by iterating every movie
        for (UserTagCountModel userTagCountModel : list) {
            preferenceVector[userTagCountModel.getTagId()] = userTagCountModel.getCount();
        }

        return preferenceVector;
    }

    // step 2: retrieve movies * tags matrix
    public int[][] getMovieTagMatrix() {
        int[][] movieTagMatrix = new int[NUM_OF_MOVIE][NUM_OF_TAG];
        List<MovieHasTagModel> movieHasTagList =  movieHasTagDAO.getAllMovieHasTag();
        for (MovieHasTagModel movieHasTag : movieHasTagList) {
            movieTagMatrix[movieHasTag.getMovieId()][movieHasTag.getTagId()] = 1;
        }
        return movieTagMatrix;
    }

    // step 3: multiply each row in the matrix with the user preference vector to obtain top K movies
    public List<MovieModel> findMovies(String username) {
        // init
        this.NUM_OF_MOVIE = movieDAO.getMovieNumber();
        this.username = username;
        int K = 5;

        int[][] movieTagMatrix = getMovieTagMatrix();
        int[] preferenceVector = calculatePreferenceVector();

        // priotity queue to keep top K movie id
        PriorityQueue<MovieScore> priorityQueue = new PriorityQueue<>((ms1, ms2) -> (ms1.score - ms2.score));

        for (int row = 0; row < NUM_OF_MOVIE; row++) {

            // calculate current movie's score
            int score = 0;

            for (int col = 0; col < NUM_OF_TAG; col++) {
                score += preferenceVector[col] * movieTagMatrix[row][col];
            }

            MovieScore ms = new MovieScore(row, score);

            priorityQueue.offer(ms);
            if (priorityQueue.size() > K) {
                priorityQueue.poll();
            }
        }

        List<MovieModel> list = new LinkedList<>();

        // collect top K movies and return
        for (MovieScore ms : priorityQueue) {
            MovieModel movie = movieDAO.getMovieById(ms.movieId);
            list.add(movie);
        }

        return list;
    }

    private class MovieScore {
        int movieId;
        int score;
        public MovieScore(int _movieId, int _score) {
            movieId = _movieId;
            score = _score;
        }

        @Override
        public String toString() {
            return "MovieScore{" +
                    "movieId=" + movieId +
                    ", score=" + score +
                    '}';
        }
    }
}
