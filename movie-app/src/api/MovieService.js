import axios from "axios";

class MovieService {
  getMovieDetailById(movieId) {
    return axios.get(`http://localhost:8080/movies/${movieId}`);
  }

  getRatingDetailById(movieId) {
    return axios.get(`http://localhost:8080/rating/${movieId}`);
  }

  addRating(vote) {
    return axios.post(`http://localhost:8080/rating/`, vote);
  }
}
export default new MovieService();
