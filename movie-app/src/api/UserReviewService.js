import axios from "axios";

class UserReviewService {
  retrieveUserInfo(userName) {
    return axios.get(`http://localhost:8080/user/${userName}`);
  }

  retrieveReviewsByReviewId(reviewId) {
    console.log("retrieve reviews by review id");
    return axios.get(`http://localhost:8080/reviews/${reviewId}`);
  }

  retrieveReviewsByUsername(userName) {
    console.log("excuted service");
    return axios.get(`http://localhost:8080/user/${userName}/reviews`);
  }

  retrieveReviewsByMovieId(movieId) {
    return axios.get(`http://localhost:8080/movies/${movieId}/reviews`);
  }

  insertReview(review) {
    console.log("insert review");
    return axios.post(`http://localhost:8080/reviews`, review);
  }

  deleteReview(id) {
    return axios.delete(`http://localhost:8080/reviews/${id}`);
  }

  updateReview(id, review) {
    return axios.put(`http://localhost:8080/reviews/${id}`, review);
  }
}

export default new UserReviewService();
