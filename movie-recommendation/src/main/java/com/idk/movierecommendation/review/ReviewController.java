//package com.idk.movierecommendation.review;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RestController
//@RequestMapping("/reviews")
//public class ReviewController {
//
//    @Autowired
//    private ReviewDAO reviewDAO;
//
//    @GetMapping("/movies/{moviesId}")
//    public List<ReviewModel> getReviewByMovie(@PathVariable(value = "moviesId") int moviesId) {
//        return reviewDAO.getReviewByMovie(moviesId);
//    }
//
//    @GetMapping("/{id}/find")
//    public ReviewModel getReviewById(@PathVariable(value = "id") String id) {
//        return reviewDAO.getReviewById(id);
//    }
//
//    @GetMapping("/{usersName}")
//    public List<ReviewModel> getReviewByUser(@PathVariable(value = "usersName") String usersName) {
//        int usersId=reviewDAO.getUserByName(usersName);
//        return reviewDAO.getReviewByUser(usersId);
//    }
//
//    @PostMapping("")
//    public ReviewModel postReview(@Valid @RequestBody ReviewModel reviewModel){
//        return reviewDAO.postReview(reviewModel);
//    }
//
//    @DeleteMapping("/{id}/delete")
//    public ReviewModel deleteReview(@PathVariable(value = "id") String id) {
//        return reviewDAO.deleteReviewById(id);
//    }
//
//    @PutMapping("/{id}/update")
//    public ReviewModel updateReview(@PathVariable(value = "id") String id, @Valid @RequestBody ReviewModel review){
//        review.setId(id);
//        return reviewDAO.updateReview(review);
//    }
//}
