package com.idk.movierecommendation.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserDAO userDAO;

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
}
