package com.idk.movierecommendation.reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/reviews")
public class ReviewsController {

    @Autowired
    private ReviewsDAO reviewsDAO;

    @GetMapping("/{id}")
    public ReviewsModel getReviewById(@PathVariable(value = "id") int id) {
        return reviewsDAO.getReviewById(id);
    }

    @PostMapping
    public ReviewsModel insertReview(@Valid @RequestBody ReviewsModel review) {
        return reviewsDAO.insertReview(review);
    }

    @DeleteMapping("/{id}")
    public ReviewsModel deleteReview(@PathVariable(value = "id") int id) {
        return reviewsDAO.deleteReviewById(id);
    }

    @PutMapping("/{id}")
    public ReviewsModel updateReview(@PathVariable(value = "id") int id, @Valid @RequestBody ReviewsModel review) {
        return reviewsDAO.updateReviewById(review);
    }
}
