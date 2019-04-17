package com.idk.movierecommendation.user;

public class UserModel {

    private int id;
    private String username;
    private String password;
    private String email;

    protected UserModel(){}

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "ReviewModel{" +
                "id='" + id + '\'' +
                ", username='" + username + '\''+
                ", password=" + password + '\''+
                ", email=" + email +'\''+
                '}';
    }
}
