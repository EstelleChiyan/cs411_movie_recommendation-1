package com.idk.movierecommendation.tag;

public class MovieHasTagModel {

    private int movieId;
    private int tagId;

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Override
    public String toString() {
        return "MovieHasTagModel{" +
                "movieId=" + movieId +
                ", tagId=" + tagId +
                '}';
    }
}
