package com.idk.movierecommendation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("{moviesId}/reviews")
public class ReviewController {
    @Autowired
    private ReviewDAO reviewDAO;

    @GetMapping
    public List<ReviewModel> getReviewByMovie(@PathVariable(value = "moviesId") int moviesId) {
        return reviewDAO.getReviewByMovie(moviesId);
    }

    @PostMapping
    public ReviewModel postReview(@Valid @RequestBody ReviewModel reviewModel){
        return reviewDAO.postReview(reviewModel);
    }
}
