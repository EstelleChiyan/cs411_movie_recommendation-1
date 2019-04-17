import axios from "axios";

class UserRatingService {
  updateRating(rating) {
    console.log("post rating");

    console.log(rating);
    console.log("check end");

    return axios.post(`http://localhost:8080/movie/addrating`, rating);
  }
}

export default new UserRatingService();
