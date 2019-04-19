import React, { Component } from "react";
import Authentication from "./Authentication";
import UserReviewService from "../api/UserReviewService";

class ListreviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
    this.deleteReviewClicked = this.deleteReviewClicked.bind(this);
    this.refreshReviews = this.refreshReviews.bind(this);
    this.updateReviewClicked = this.updateReviewClicked.bind(this);
  }

  componentDidMount() {
    let username = Authentication.getLoggedInUserName();
    UserReviewService.retrieveUserInfo(username).then(Response => {
      let id = Response.data.id;
      UserReviewService.retrieveReviesByUserId(id).then(res => {
        this.setState({
          reviews: res.data
        });
      });
    });
  }

  deleteReviewClicked(id) {
    console.log(id);
    UserReviewService.deleteReview(id).then(Response => {
      console.log("delete review successful");
      this.refreshReviews();
    });
  }

  refreshReviews() {
    let username = Authentication.getLoggedInUserName();
    UserReviewService.retrieveUserInfo(username).then(Response => {
      let id = Response.data.id;
      UserReviewService.retrieveReviesByUserId(id).then(res => {
        this.setState({
          reviews: res.data
        });
      });
    });
  }

  updateReviewClicked(id) {
    this.props.history.push(`/reviews/${id}/update`);
  }

  render() {
    return (
      <div>
        <h2>My Movie Reviews</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>movie</th>
              <th>review</th>
              <th>date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reviews.map(review => (
              <tr key={review.id}>
                <td>{review.movies_id}</td>
                <td>{review.content}</td>
                <td>{review.post_date}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => this.updateReviewClicked(review.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => this.deleteReviewClicked(review.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ListreviewComponent;
