package com.idk.movierecommendation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/movies")
public class MovieDetailController {

    @Autowired
    private MovieDetailDAO movieDetailDAO;

    @GetMapping
    public List<MovieDetailModel> getMovies() {
        return movieDetailDAO.getMovies();
    }

    @GetMapping("/{id}")
    public MovieDetailModel getMovieById(@PathVariable(value = "id") int id) {
        return movieDetailDAO.getMovieById(id);
    }

    @PostMapping
    public MovieDetailModel insertMovie(@Valid @RequestBody MovieDetailModel movie) {
        return movieDetailDAO.insertMovie(movie);
    }

    @DeleteMapping("/{id}")
    public MovieDetailModel deleteMovie(@PathVariable(value = "id") int id) {
        return movieDetailDAO.deleteMovieById(id);
    }

    @PutMapping("/{id}")
    public MovieDetailModel updateMovie(@PathVariable(value = "id") int id, @Valid @RequestBody MovieDetailModel movie){
        movie.setId(id);
        return movieDetailDAO.updateMovie(movie);
    }
}

