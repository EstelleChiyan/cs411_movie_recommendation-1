import React, { Component } from "react";

class Movie extends Component {
  render() {
    return (
      <div className="movie">
        <figure className="movie_figure">
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
              this.props.poster_path
            }`}
            className="movie_poster"
          />
          <figcaption>
            <span className="movie_vote">{this.props.vote_average}/10</span>
          </figcaption>
          <div className="movie_title">{this.props.title}</div>
        </figure>
      </div>
    );
  }
}

export default Movie;
