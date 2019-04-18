import React, { Component } from "react";
import Authentication from "./Authentication";
import UserReviewService from "../api/UserReviewService";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
    this.signUpClicked = this.signUpClicked.bind(this);
  }
  handlerChange(event) {
    //console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loginClicked() {
    let name = this.state.username;
    var userInfo = null;
    UserReviewService.retrieveUserInfo(name).then(Response => {
      console.log(Response);
      userInfo = Response.data;
      console.log(userInfo);
      console.log(userInfo.password);
      if (userInfo === null) {
        console.log("No Such User");
      } else if (this.state.password !== userInfo.password) {
        console.log("Wrong password");
        this.setState({ hasLoginFailed: true });
      } else {
        console.log("Find User. Login Success");
        Authentication.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
        this.setState({});
        this.props.history.push("/");
      }
    });
  }

  signUpClicked() {
    this.props.history.push("/signup");
  }

  render() {
    return (
      <div className="loginform">
        <h2>Welcome</h2>
        <div className="form-group">
          <div>
            <input
              type="text"
              className="loginbox"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handlerChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="loginbox"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlerChange}
            />
          </div>
          <div>
            <button
              className="btn-primary btn-sm btn-space"
              onClick={this.loginClicked}
            >
              Login
            </button>
            <button
              className="btn-primary btn-sm btn-space"
              onClick={this.signUpClicked}
            >
              SignUp
            </button>
          </div>
          {this.state.hasLoginFailed && <div>Invalid Username or Password</div>}
        </div>
      </div>
    );
  }
}

export default LoginComponent;
