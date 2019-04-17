import axios from "axios";

class UserRatingService {
  updateRating(rating) {
    //   private int rating;
    //   private Date rating_date;
    //   private int movies_id;
    //   private int users_id;
    console.log("update rating");

    console.log(rating);
    console.log("check end");

    return axios.post(`http://localhost:8080/movie/addrating`, rating);
  }
}

export default new UserRatingService();
