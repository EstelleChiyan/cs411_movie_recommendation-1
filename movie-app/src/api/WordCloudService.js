import axios from "axios";




class WordCloudService {
    retrieveWordcountByMovieId(movieId) {
        console.log("retrieve word count by movie id");
        return axios.get(`http://localhost:8080/wordcloud/${movieId}`);
      }
    retrieveWordcountByUserId(userId,movieId) {
        console.log("retrieve word count by user id");
        return axios.get(`http://localhost:8080/cuswordcloud/${userId}/${movieId}`);
    }
}
export default new WordCloudService();