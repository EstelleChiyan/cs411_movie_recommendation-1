import axios from "axios";

let config = require("./config");

class UserRatingService {
  updateRating(rating) {
    console.log("post rating");

    console.log(rating);
    console.log("check end");

    return axios.post(`${config.backend_url}/movie/addrating`, rating);
  }
}

export default new UserRatingService();
