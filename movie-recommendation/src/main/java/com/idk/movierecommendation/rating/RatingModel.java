package com.idk.movierecommendation.rating;
import java.util.Date;

public class RatingModel {
    private int rating;
    private Date rating_date;
    private int movie_id;
    private int user_id;

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Date getRating_date() {
        return rating_date;
    }

    public void setRating_date(Date rating_date) {
        this.rating_date = rating_date;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    @Override
    public String toString() {
        return "RatingModel{" +
                "rating=" + rating +
                ", rating_date=" + rating_date +
                ", movie_id=" + movie_id +
                ", user_id=" + user_id +
                '}';
    }
}
