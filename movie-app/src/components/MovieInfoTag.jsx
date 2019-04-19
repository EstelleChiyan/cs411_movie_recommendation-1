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

class MoviesInfoTag extends Component {
  render() {
    return <div>{this.props.tags.map(tag_id => TAG_LIST[tag_id] + " ")}</div>;
  }
}

export default MoviesInfoTag;
