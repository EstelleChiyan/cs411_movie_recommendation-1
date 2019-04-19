import React, { Component } from "react";
import axios from "axios";

import Movie from "./Movie";

const TAG_LIST = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western"
];

class MoviesWithTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      tagId: 0
    };
  }

  getMovies = tagId => {
    // const url = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;
    const url = `http://localhost:8080/movies/tags/${tagId}`;
    axios.get(url).then(res => {
      this.setState({
        movies: res.data,
        tagId: tagId
      });
    });
  };

  handleClick = tagId => {
    this.getMovies(tagId);
  };

  componentDidMount() {
    this.getMovies(this.state.tagId);
  }

  render() {
    const { movies } = this.state;
    const tags = TAG_LIST.map((tag, tagId) => {
      return (
        <div
          className={this.state.tagId === tagId ? "tag-active" : "tag"}
          onClick={() => this.handleClick(tagId)}
          key={tagId}
        >
          <p className="tag-name"> {tag} </p>
        </div>
      );
    });

    return (
      <div>
        <div className="tag-list">
          <h3>Tag</h3>
          {tags}
        </div>
        <ul className="movies">
          {movies.map(movie => (
            <li key={movie.id}>
              <Movie {...movie} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MoviesWithTag;
