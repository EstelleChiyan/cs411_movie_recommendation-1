package com.idk.movierecommendation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public MovieDetailModel getMovieById(@PathVariable int id) {
        return movieDetailDAO.getMovieById(id);
    }
}

