import axios from "axios";

let config = require("./config");

class MovieSearchService {
  retrieveMovieSearch(searchWord) {
    return axios.get(`${config.backend_url}/movies/match/${searchWord}`);
  }

  retrieveMovieByName(title) {
    return axios.get(`${config.backend_url}/movies/title/${title}`);
  }
}

export default new MovieSearchService();
