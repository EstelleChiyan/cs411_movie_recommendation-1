package com.idk.movierecommendation.rating;
import java.util.Date;
public class RatingModel {
    private int rating;
    private Date rating_date;
    private int movies_id;
    private int users_id;

    protected RatingModel(){

    }

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

    public int getMovies_id() {
        return movies_id;
    }

    public void setMovies_id(int movies_id) {
        this.movies_id = movies_id;
    }

    public int getUsers_id() {
        return users_id;
    }

    public void setUsers_id(int users_id) {
        this.users_id = users_id;
    }

    @Override
    public String toString() {
        return "RatingModel{" +
                "rating='" + rating + '\'' +
                ", rating_date='" + rating_date + '\''+
                ", movies_id=" + movies_id + '\''+
                ", users_id=" + users_id +'\''+
                '}';
    }

}
