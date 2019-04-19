import React, { Component } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import Authentication from "./Authentication";
import UserReviewService from "../api/UserReviewService";
import moment from "moment";

class ReviewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      review: {
        id: null,
        content: "",
        post_date: "",
        movie_id: this.props.movie_id,
        user_id: null
      }
    };
  }

  componentDidMount() {
    UserReviewService.retrieveReviewsByMovieId(this.props.movie_id).then(
      res => {
        const reviews = res.data;
        this.setState({ reviews });
      }
    );
    let review = this.state.review;
    if (Authentication.isUserLoggedIn()) {
      let username = Authentication.getLoggedInUserName();
      UserReviewService.retrieveUserInfo(username).then(Response => {
        const userInfo = Response.data;
        review.user_id = userInfo.id;
        this.setState({ review });
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    let reviews = [];
    let review = {};
    Object.assign(review, this.state.review);
    Object.assign(reviews, this.state.reviews);

    review.post_date = moment(new Date()).format("YYYY-MM-DD");
    reviews.push(review);
    this.setState({ reviews });

    UserReviewService.insertReview(review);
    document.getElementById("review-text").value = "";
  };

  handleChange = event => {
    let review = this.state.review;
    review.content = event.target.value;
    this.setState({ review });
  };

  render() {
    //console.log(this.state.review.user_id);
    let form = null;
    if (this.state.review.user_id)
      form = (
        <ReviewForm onSubmit={this.handleSubmit} onChange={this.handleChange} />
      );
    else form = <p>Please Login to Review</p>;
    return (
      <div>
        <ReviewList reviews={this.state.reviews} />
        {form}
        {/* <ReviewForm onSubmit={this.handleSubmit} onChange={this.handleChange} /> */}
      </div>
    );
  }
}

export default ReviewApp;
