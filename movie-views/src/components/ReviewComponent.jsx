import React, { Component } from 'react';
import moment from 'moment'
import UserReviewService from '../api/UserReviewService';

import {Form} from 'formik';
class ReviewComponent extends Component{


    constructor(props){
        super(props)
        this.state ={
            id: this.props.match.params.id,
            content:'',
            post_date: moment(new Date()).format('YYYY-MM-DD')+ "T00:00:00.000+0000",
            movies_id:'',
            users_id:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
      
    }

    handleChange(event){

        this.setState({
            content: event.target.value,
        });
      
    }

    handleSubmit(event){
        let id=this.state.id;
        //console.log(id)
        UserReviewService.retrieveReview(id)
            .then(
                Response => {
                    //console.log(Response.data)
                    this.setState(
                        {
                            movies_id:Response.data.movies_id,
                            users_id:Response.data.users_id
                        }
                    )
                    //console.log('set success')
                    //console.log(this.state)
                }
            )
        
        UserReviewService.updateReview(this.state.id,this.state)
            .then(
                Response => {
                    //console.log(Response)
                    
                    //console.log('set success')
                    //console.log(this.state)
                }
            )
            .catch(
                Error =>{

                }
            )
        //alert('A review was modified ');
        //event.preventDefault();
    }
    
    // loginClicked(){
    //     let name=this.state.username;
    //     var userInfo=null;
    //     UserReviewService.retrieveUserInfo(name)
    //         .then(
    //             Response => {
    //                 console.log(Response)
    //                 userInfo=Response.data;
    //                 console.log(userInfo);
    //                 console.log(userInfo.password);
    //                 if(userInfo===null){
    //                     console.log('No Such User');
    //                 }
    //                 else if(this.state.password!==userInfo.password){
    //                     console.log("Wrong password");
    //                     this.setState({hasLoginFailed:true})
    //                 }
    //                 else{
    //                     console.log('Find User. Login Success')
    //                     Authentication.registerSuccessfulLogin(this.state.username,this.state.password);
    //                     this.props.history.push("/reviews")
    //                 }
    //             }
    //         )
    // }

    
    render(){
        // console.log(this.state)
        
        return (
            <div>
                <h2>My Review</h2>
                <Form>
                    <div className="form-group"> 
                        <textarea rows="4" cols="100" value={this.state.content} onChange={this.handleChange}>
                        {/* {this.state.content} */}
                        </textarea>
                    </div> 
                </Form>
                <div>
                    {/* <button className="btn btn-primary btn-lg btn-space"  onClick={this.invertClicked}>Invert</button> */}
                        
                    <button className="btn btn-success btn-lg " onClick={this.handleSubmit}>DoubleToSubmit</button>    
                </div>
                   
                
            </div>
        )
    }
}
export default ReviewComponent;
