package com.idk.movierecommendation.reviews;

import java.util.Date;

public class ReviewsModel {
    private int id;
    private String content;
    private Date postDate;
    private int movieId;
    private int userId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ReviewsModel{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", postDate=" + postDate +
                ", movieId=" + movieId +
                ", userId=" + userId +
                '}';
    }
}
