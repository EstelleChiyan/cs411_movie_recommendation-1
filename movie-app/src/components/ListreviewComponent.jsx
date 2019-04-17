import React, { Component } from 'react';
import Authentication from './Authentication';
import UserReviewService from '../api/UserReviewService';

class ListreviewComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            reviews:[
                // {id: 1, movie:'Harry', rate: 5, moviereview:'review of movie', date:'20190203'},
                // {id: 2, movie:'Harry2', rate: 5, moviereview:'review of movie', date:'20190203'}
            ] 
        }
        this.deleteReviewClicked=this.deleteReviewClicked.bind(this);
        this.refreshReviews=this.refreshReviews.bind(this);
        this.updateReviewClicked=this.updateReviewClicked.bind(this);
        

    }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount')
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate')
    //     console.log(nextProps)
    //     console.log(nextState)
    //     return true
    // }

    componentDidMount() {
        let username = Authentication.getLoggedInUserName('authenticatedUser')
        UserReviewService.retrieveAllUserReviews(username)
            .then(
                Response => {
                    // console.log(Response);
                    this.setState({
                        reviews: Response.data
                    })
                    
                }
            )
        
    }

    deleteReviewClicked(id){
        console.log(String(id));
        UserReviewService.deleteReview(id)
            .then(
                Response => {
                    console.log('delete review successful')
                    this.refreshReviews()
                }
            )
    }

    refreshReviews() {
        let username = Authentication.getLoggedInUserName('authenticatedUser')
        UserReviewService.retrieveAllUserReviews(username)
            .then(
                Response => {
                    // console.log(Response);
                    this.setState({
                        reviews: Response.data
                    })
                    
                }
            )

    }

    // deleteReviewClicked(id) {
    //     let username = AuthenticationService.getLoggedInUserName()
    //     //console.log(id + " " + username);
    //     TodoDataService.deleteTodo(username, id)
    //         .then(
    //             response => {
    //                 this.setState({ message: `Delete of todo ${id} Successful` })
    //                 this.refreshTodos()
    //             }
    //         )

    // }

    // addReviewClicked() {
    //     this.props.history.push(`/todos/-1`)
    // }

    updateReviewClicked(id) {
        console.log('update review'+id)
        this.props.history.push(`/reviews/${id}/update`)

    }

    
    render(){
        // const UsernameLogged = Authentication.getLoggedInUserName();
        // console.log(UsernameLogged);
        return (
            <div>
                <h2>
                    My Movie Reviews
                </h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>movie</th>
                            {/* <th>rate</th> */}
                            <th>review</th>
                            <th>date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.reviews.map(
                                review =>
                                    <tr key={review.id}>  
                                        <td>{review.movies_id}</td>
                                        {/* <td>{review.rate}</td> */}
                                        <td>{review.content}</td>
                                        <td>{review.post_date}</td> 
                                        <td><button className="btn btn-success" onClick={() => this.updateReviewClicked(review.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteReviewClicked(review.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ListreviewComponent;

