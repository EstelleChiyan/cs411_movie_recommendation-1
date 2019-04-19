import React, { Component } from "react";
import axios from "axios";
import UserService from "../api/UserService";

class RegistrationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 10,
      username: "",
      password: "",
      email: ""
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.registerClicked = this.registerClicked.bind(this);
    //this.showSuccessful = this.showSuccessful.bind(this)
  }
  handlerChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.content);
  }

  registerClicked() {
    console.log(this.state);
    let user = this.state;
    UserService.insertUser(user).then(Response => {
      if (Response.status === 200) {
        console.log("register successful");
        this.props.history.push("/regsuccess");
      }
    });
  }

  render() {
    return (
      <div className="registerform">
        <h2>Welcome</h2>
        <div className="form-group">
          {/* <div>
                        <input type="number" className="loginbox"  name="id" placeholder="id" value={this.state.username} onChange={this.handlerChange}/>
                    </div> */}
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
            <input
              type="email"
              className="loginbox"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handlerChange}
            />
          </div>
          <div>
            <button
              className="btn-primary btn-sm btn-space"
              onClick={this.registerClicked}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationComponent;
