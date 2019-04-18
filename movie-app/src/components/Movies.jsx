import React, { Component } from "react";
import axios from "axios";

import Movie from "./Movie";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  getPopularMovies = () => {
    // const url = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;
    const url = `http://localhost:8080/${this.props.apiUrl}`;
    console.log(url);
    axios.get(url).then(res => {
      this.setState({
        movies: res.data
      });
    });
  };

  componentDidMount() {
    this.getPopularMovies();
  }

  render() {
    const { movies } = this.state;

    return (
      <ul className="movies">
        {movies.map(movie => (
          <li key={movie.id}>
            <Movie {...movie} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Movies;
