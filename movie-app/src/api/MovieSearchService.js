import axios from "axios";

class MovieSearchService {
  retrieveMovieSearch(searchWord) {
    return axios.get(`http://localhost:8080/movies/match/${searchWord}`);
  }

  retrieveMovieByName(title) {
    return axios.get(`http://localhost:8080/movies/title/${title}`);
  }
}

export default new MovieSearchService();
