import React, { Component } from 'react';
import Authentication from './Authentication';
import {BrowserRouter as Redirect, Route} from 'react-router-dom';

class AuthenticatedRoute extends Component{
    render(){
        if(Authentication.isUserLoggedIn()){
            return <Route {...this.props}/>
        }
        else{
            return <Redirect to="/login"/>
        }
    }
}
export default AuthenticatedRoute