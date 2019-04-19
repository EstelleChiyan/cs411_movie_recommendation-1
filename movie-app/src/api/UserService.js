import axios from "axios";
class UserService {
  insertUser(user) {
    return axios.post(`http://localhost:8080/user`, user);
  }
}

export default new UserService();
