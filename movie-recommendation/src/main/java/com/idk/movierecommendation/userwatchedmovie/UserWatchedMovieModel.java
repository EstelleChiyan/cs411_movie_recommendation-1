package com.idk.movierecommendation.userwatchedmovie;

public class UserWatchedMovieModel {

    private int userId;
    private int movieId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    @Override
    public String toString() {
        return "UserWatchedMovieModel{" +
                "userId=" + userId +
                ", movieId=" + movieId +
                '}';
    }
}
