package com.idk.movierecommendation.tag;

import com.idk.movierecommendation.movie.MovieModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/tags")
public class MovieHasTagController {

    @Autowired
    private MovieHasTagDAO movieHasTagDAO;

    @GetMapping
    public List<MovieHasTagModel> getAllMovieHasTag() {
        return movieHasTagDAO.getAllMovieHasTag();
    }

    @GetMapping("/{movieId}")
    public List<MovieHasTagModel> getTagsByMovieId(@PathVariable(value = "movieId") int movieId){
        return movieHasTagDAO.getTagByMovieId(movieId);
    }
}
