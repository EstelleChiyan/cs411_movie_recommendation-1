package com.idk.movierecommendation.movie;


import com.idk.movierecommendation.reviews.ReviewsDAO;
import com.idk.movierecommendation.reviews.ReviewsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieDAO movieDAO;

    @Autowired
    private ReviewsDAO reviewsDAO;

    @GetMapping
    public List<MovieModel> getMovies() {
        return movieDAO.getMovies();
    }

    @GetMapping("/{id}")
    public MovieModel getMovieById(@PathVariable(value = "id") int id) {
        return movieDAO.getMovieById(id);
    }

    @PostMapping
    public MovieModel insertMovie(@Valid @RequestBody MovieModel movie) {
        return movieDAO.insertMovie(movie);
    }

    @DeleteMapping("/{id}")
    public MovieModel deleteMovie(@PathVariable(value = "id") int id) {
        return movieDAO.deleteMovieById(id);
    }

    @PutMapping("/{id}")
    public MovieModel updateMovie(@PathVariable(value = "id") int id, @Valid @RequestBody MovieModel movie){
        return movieDAO.updateMovie(movie);
    }

    @GetMapping("/{id}/reviews")
    public List<ReviewsModel> getReviewsByMovieId(@PathVariable(value = "id") int id) {
        return reviewsDAO.getReviewByMovieId(id);
    }

    @GetMapping("/tags/{tagId}")
    public List<MovieModel> getMoviesByTag(@PathVariable(value = "tagId") int tagId) {
        return movieDAO.getMoviesByTag(tagId);
    }

    @GetMapping("/title/{name}")
    public MovieModel getMovieByName(@PathVariable(value="name") String name){
        return movieDAO.getMovieByName(name);
    }

    @GetMapping("/match/{title}")
    public List<String> getMatchMovies(@PathVariable(value = "title") String title){
        List<MovieModel> MatchMovies = movieDAO.getMatchMovies(title);
        List<String> MatchMoviesTitle = new LinkedList<>();
        for (MovieModel match: MatchMovies) {
            MatchMoviesTitle.add(match.getTitle());
        }
        return MatchMoviesTitle;
    }
}

