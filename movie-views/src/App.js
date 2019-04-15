import React, { Component } from "react";
import axios from "axios";

import Movies from "./components/movies";
import Search from "./components/search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      query: ""
    };
  }

  onChange = e => {
    this.setState({ query: e.target.value });
    this.getMoviesByQuery();
  };

  getMoviesByQuery = () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${
      this.state.query
    }&api_key=cfe422613b250f702980a3bbf9e90716`;
    axios.get(url).then(res => {
      this.setState({
        movies: res.data.results
      });
    });
  };

  getPopularMovies = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;
    axios.get(url).then(res => {
      this.setState({
        movies: res.data.results
      });
    });
  };

  componentDidMount() {
    this.getPopularMovies();
  }

  render() {
    const { movies, query } = this.state;

    return (
      <div className="app">
        <Search
          query={query}
          onChange={this.onChange}
          placeholder="Search Movies"
        />
        <Movies movies={movies} />
      </div>
    );
  }
}

export default App;
