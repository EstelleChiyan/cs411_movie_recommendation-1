import axios from "axios";

let config = require("./config");

class WordCloudService {
  retrieveWordcountByMovieId(movieId) {
    return axios.get(`${config.backend_url}/wordcloud/${movieId}`);
  }

  retrieveWordcountByUserId(userId, movieId) {
    console.log(userId);
    console.log(movieId);
    return axios.get(`${config.backend_url}/cuswordcloud/${userId}/${movieId}`);
  }
}
export default new WordCloudService();
