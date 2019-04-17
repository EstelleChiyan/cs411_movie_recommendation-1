import React, { Component } from "react";
import { Link } from "react-router-dom";

class Movie extends Component {
  render() {
    return (
      <div className="movie">
        <figure className="movie_figure">
          <Link to={`/movies/${this.props.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                this.props.poster_path
              }`}
              className="movie_poster"
              alt={this.props.title}
            />
          </Link>
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
