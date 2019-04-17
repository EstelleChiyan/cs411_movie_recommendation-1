package com.idk.movierecommendation.movie;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieDAO movieDAO;

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
}

