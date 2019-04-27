import axios from "axios";

let config = require("./config");

class UserService {
  insertUser(user) {
    return axios.post(`${config.backend_url}/user`, user);
  }
}

export default new UserService();
