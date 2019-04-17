import React, { Component } from "react";

import Movie from "./movie";

class Movies extends Component {
  render() {
    return (
      <ul className="movies">
        {this.props.movies.map(movie => (
          <li key={movie.id}>
            <Movie {...movie} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Movies;
