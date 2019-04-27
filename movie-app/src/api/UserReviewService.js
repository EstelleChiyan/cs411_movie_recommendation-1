import axios from "axios";

let config = require("./config");

class UserReviewService {
  retrieveUserInfo(userName) {
    return axios.get(`${config.backend_url}/user/${userName}`);
  }

  retrieveReviewsByReviewId(reviewId) {
    console.log("retrieve reviews by review id");
    return axios.get(`${config.backend_url}/reviews/${reviewId}`);
  }

  retrieveReviewsByUsername(userName) {
    console.log("excuted service");
    return axios.get(`${config.backend_url}/user/${userName}/reviews`);
  }

  retrieveReviesByUserId(id) {
    return axios.get(`${config.backend_url}/user/${id}/reviews`);
  }

  retrieveReviewsByMovieId(movieId) {
    return axios.get(`${config.backend_url}/movies/${movieId}/reviews`);
  }
  insertReview(review) {
    console.log("insert review");
    return axios.post(`${config.backend_url}/reviews`, review);
  }

  deleteReview(id) {
    return axios.delete(`${config.backend_url}/reviews/${id}`);
  }

  updateReview(id, review) {
    return axios.put(`${config.backend_url}/reviews/${id}`, review);
  }
}

export default new UserReviewService();
