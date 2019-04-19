package com.idk.movierecommendation.rating;
import com.idk.movierecommendation.reviews.ReviewsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private RatingDAO ratingDAO;

    @PostMapping
    public RatingModel addRating(@Valid @RequestBody RatingModel rating){
        return ratingDAO.addRating(rating);
    }

    @GetMapping("/{movieId}")
    public List<RatingModel> getRatingByMovieId(@PathVariable(value = "movieId") int movieId){
        return ratingDAO.getRatingByMovieId(movieId);
    }

    @GetMapping("/all")
    public  List<RatingModel> getRatings(){
        return ratingDAO.getAllRating();
    }

    @GetMapping("/{movieId}/{userId}")
    public RatingModel getRatingByUserAndMovie(@PathVariable("movieId")int movieId, @PathVariable("userId")int userId){
        return ratingDAO.getRatingByUserAndMovie(userId, movieId);
    }
}
