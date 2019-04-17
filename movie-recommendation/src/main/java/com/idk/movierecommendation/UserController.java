package com.idk.movierecommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
//@RequestMapping(value={"user/{username}/info", "user/{username}/info/modify"})
public class UserController {
    @Autowired
    private UserDAO userDAO;

    @GetMapping("user/{username}/info")
    public ResponseEntity<UserModel> getUserByName(@PathVariable(name = "username") String username){
        UserModel user=userDAO.getUserByName(username);
        return new ResponseEntity<UserModel>(user, HttpStatus.OK);
    }


    @PutMapping("user/{username}/info/modify")
    public ResponseEntity<UserModel> updateUser(@PathVariable(name = "username") String username, @Valid @RequestBody UserModel userModel){
        userModel.setUsername(username);
        UserModel user=userDAO.updateUser(userModel);
        return new ResponseEntity<UserModel> (user, HttpStatus.OK);
    }

    @PostMapping("user/create")
    public ResponseEntity<UserModel> postUser(@Valid @RequestBody UserModel userModel){
        String username=userModel.getUsername();

        UserModel user=userDAO.postUser(userModel);
        //UserModel user=userDAO.updateUser(userModel);

        return new ResponseEntity<UserModel>(user, HttpStatus.OK);

    }




}
