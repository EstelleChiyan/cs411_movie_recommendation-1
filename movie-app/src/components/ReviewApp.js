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
        id: 3,
        content: "",
        post_date: "",
        movie_id: this.props.movie_id,
        user_id: 0
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
    let username = Authentication.getLoggedInUserName("authenticatedUser");
    UserReviewService.retrieveUserInfo(username).then(Response => {
      const userInfo = Response.data;
      review.user_id = userInfo.id;
      this.setState({ review });
    });

    console.log(this.state.review);
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
    return (
      <div>
        <ReviewList reviews={this.state.reviews} />
        <ReviewForm onSubmit={this.handleSubmit} onChange={this.handleChange} />
      </div>
    );
  }
}

export default ReviewApp;
