package com.idk.movierecommendation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
//@RequestMapping("{moviesId}/reviews")
//@RequestMapping(value={"moviesId}/reviews", "user/{usersId}/reviews", })
public class ReviewController {
    @Autowired
    private ReviewDAO reviewDAO;

    //@RequestMapping(value = {"{moviesId}/reviews"}, method = RequestMethod.GET)
    @GetMapping("{moviesId}/reviews")
    public List<ReviewModel> getReviewByMovie(@PathVariable(value = "moviesId") int moviesId) {
        return reviewDAO.getReviewByMovie(moviesId);
    }

    @GetMapping("reviews/{id}/find")
    public ReviewModel getReviewById(@PathVariable(value = "id") String id) {
        return reviewDAO.getReviewById(id);
    }

    @GetMapping("reviews/{usersName}")
    //@RequestMapping(value = {"{usersId}/reviews"}, method = RequestMethod.GET)
    public List<ReviewModel> getReviewByUser(@PathVariable(value = "usersName") String usersName) {
        int usersId=reviewDAO.getUserByName(usersName);
        return reviewDAO.getReviewByUser(usersId);
    }

    //@RequestMapping(value = {"/reviews"}, method = RequestMethod.POST)
    @PostMapping("reviews")
    public ReviewModel postReview(@Valid @RequestBody ReviewModel reviewModel){
        return reviewDAO.postReview(reviewModel);
    }

    @DeleteMapping("reviews/{id}/delete")
    public ReviewModel deleteMovie(@PathVariable(value = "id") String id) {
        return reviewDAO.deleteReviewById(id);
    }

    @PutMapping("reviews/{id}/update")
    public ReviewModel updateReview(@PathVariable(value = "id") String id, @Valid @RequestBody ReviewModel review){
        review.setId(id);
        return reviewDAO.updateReview(review);
    }

}
