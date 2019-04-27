import axios from "axios";

let config = require("./config");

class MovieService {
  getMovieDetailById(movie_id) {
    return axios.get(`${config.backend_url}/movies/${movie_id}`);
  }

  getRatingDetailById(movie_id) {
    return axios.get(`${config.backend_url}/rating/${movie_id}`);
  }

  addRating(vote) {
    return axios.post(`${config.backend_url}/rating/`, vote);
  }

  getRatingByUserAndMovie(user_id, movie_id) {
    return axios.get(`${config.backend_url}/rating/${movie_id}/${user_id}`);
  }

  getTagByMovieId(movie_id) {
    return axios.get(`${config.backend_url}/tags/${movie_id}`);
  }
}
export default new MovieService();
