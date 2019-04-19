import axios from "axios";

class WordCloudService {
  retrieveWordcountByMovieId(movieId) {
    return axios.get(`http://localhost:8080/wordcloud/${movieId}`);
  }
  retrieveWordcountByUserId(userId, movieId) {
    return axios.get(`http://localhost:8080/cuswordcloud/${userId}/${movieId}`);
  }
}
export default new WordCloudService();
