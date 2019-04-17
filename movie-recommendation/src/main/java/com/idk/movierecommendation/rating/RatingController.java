package com.idk.movierecommendation.rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class RatingController {

    @Autowired
    private RatingDAO ratingDAO;

    @PostMapping("movie/addrating")
    public ResponseEntity<RatingModel> postUser(@Valid @RequestBody RatingModel ratingModel) {
        RatingModel rate = ratingDAO.postRating(ratingModel);
        return new ResponseEntity<RatingModel>(rate, HttpStatus.OK);

    }
}
