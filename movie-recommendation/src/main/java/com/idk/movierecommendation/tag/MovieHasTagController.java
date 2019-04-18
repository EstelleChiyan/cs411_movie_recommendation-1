package com.idk.movierecommendation.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
