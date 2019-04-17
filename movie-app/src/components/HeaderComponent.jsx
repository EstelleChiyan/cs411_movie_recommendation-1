import React, { Component } from "react";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";

class HeaderComonent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loginstatus: false,
      reviewpath: "/reviews"
    };
    this.clickLogout = this.clickLogout.bind(this);
    this.clickReview = this.clickReview.bind(this);
  }

  clickLogout() {
    Authentication.logout();
    this.setState({
      username: "",
      loginstatus: false,
      reviewpath: "/reviews"
    });
    //console.log('clickLogout')
    //if (this.state.loginstatus===false) {console.log('false')}
    //else {console.log('true')};
  }

  clickReview() {
    console.log(Authentication.isUserLoggedIn());

    let userlogin = Authentication.getLoggedInUserName();
    //var UsernameLoggedIn = {userlogin};
    //String   = userlogin.toString();
    //console.log(userlogin);
    var path = "/reviews/" + userlogin; //UsernameLoggedIn;//.stringify();
    //console.log(path);
    if (Authentication.isUserLoggedIn()) {
      //if (UsernameLoggedIn !== ''){
      this.setState({
        username: userlogin,
        loginstatus: true,
        reviewpath: path
      });
      //console.log('here');
    } else {
      this.setState({
        username: "",
        loginstatus: false,
        reviewpath: "/reviews"
      });
    }
    //console.log('clickReview')
    //console.log(this.state.username);
    //console.log(this.state.reviewpath);
  }

  render() {
    const isUserLoggedIn = Authentication.isUserLoggedIn();

    // const isUserLogged = this.reviewAuthentication();
    //console.log('isUserLoggedIn')
    //console.log(isUserLoggedIn)
    // this.reviewAuthentication();
    //const isUserLoggedIn=this.state.loginstatus;
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <Link to="/" className="navbar-brand">
              MovieStudio
            </Link>
          </div>
          <ul className="navbar-nav">
            <li>
              <Link className="nav-link" to="/login">
                Category
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/logout">
                Trend
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/recommend">
                Recommend
              </Link>
            </li>
          </ul>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {/* <li><Link className="nav-link" to="/reviews onClick={this.reviewAuthentication}>Reviews</Link></li> */}
            <li>
              <Link
                className="nav-link"
                to={this.state.reviewpath}
                onClick={this.clickReview}
              >
                Review
              </Link>
            </li>
            {!isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={this.clickLogout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderComonent;
