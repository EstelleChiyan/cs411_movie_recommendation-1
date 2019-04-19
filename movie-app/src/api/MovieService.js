import axios from "axios";

class MovieService {
  getMovieDetailById(movie_id) {
    return axios.get(`http://localhost:8080/movies/${movie_id}`);
  }

  getRatingDetailById(movie_id) {
    return axios.get(`http://localhost:8080/rating/${movie_id}`);
  }

  addRating(vote) {
    return axios.post(`http://localhost:8080/rating/`, vote);
  }

  getRatingByUserAndMovie(user_id, movie_id) {
    return axios.get(`http://localhost:8080/rating/${movie_id}/${user_id}`);
  }
}
export default new MovieService();
