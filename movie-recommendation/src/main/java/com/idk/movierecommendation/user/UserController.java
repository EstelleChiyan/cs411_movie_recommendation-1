package com.idk.movierecommendation.user;

import com.idk.movierecommendation.reviews.ReviewsDAO;
import com.idk.movierecommendation.reviews.ReviewsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private ReviewsDAO reviewsDAO;

    @PostMapping
    public ResponseEntity<UserModel> createUser(@Valid @RequestBody UserModel user){
        UserModel _user = userDAO.postUser(user);
        return new ResponseEntity<UserModel>(_user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserModel> findUser(@PathVariable(name="username") String username) {
        UserModel user = userDAO.getUserByName(username);
        return new ResponseEntity<UserModel>(user, HttpStatus.OK);
    }

    @PutMapping("/{username}")
    public ResponseEntity<UserModel> updateUser(@PathVariable(name = "username") String username, @Valid @RequestBody UserModel user) {
        UserModel _user = userDAO.updateUser(user);
        return new ResponseEntity<UserModel>(_user, HttpStatus.OK);
    }

    @GetMapping("/{username}/reviews")
    public ResponseEntity<List<ReviewsModel>> findReviewsByUserId(@PathVariable(name = "username") String username) {
        UserModel user = userDAO.getUserByName(username);
        List<ReviewsModel> reviews = reviewsDAO.getReviewByUserId(user.getId());
        return new ResponseEntity<List<ReviewsModel>>(reviews, HttpStatus.OK);
    }
}
