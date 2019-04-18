import axios from "axios";
class UserService {
  insertUser(user) {
    console.log(user);
    axios.post(`http://localhost:8080/user`, user);
  }
}

export default UserService;
