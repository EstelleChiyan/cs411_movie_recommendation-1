import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../bootstrap.css';
import HeaderComponent from './HeaderComponent';
import ListreviewComponent from './ListreviewComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import RegistrationComponent from './RegistrationComponent';
import ReviewComponent from './ReviewComponent';
import RegistrationSuccessfulComponent from './RegistrationSuccessfulComponent'
class MainpageComponent extends Component {
  render() {

    return (
      <div className="MainPage">
        <Router>
          <HeaderComponent></HeaderComponent>
          <Switch>
            <Route path="/" exact component={LoginComponent}/>   
            <Route path="/login" component={LoginComponent}/>
            <Route path="/signup" component={RegistrationComponent}/>
            <Route path="/regsuccess" component={RegistrationSuccessfulComponent}/>
            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
            <AuthenticatedRoute path="/reviews/:id/update" component={ReviewComponent}/>
            <AuthenticatedRoute path="/recommend" component={LoginComponent}/>
            <AuthenticatedRoute path="/reviews/:name" component={ListreviewComponent}/>
          </Switch>
          {/* <FooterComponent></FooterComponent> */}
        </Router>
      </div>
    )
  }
}

export default MainpageComponent;
