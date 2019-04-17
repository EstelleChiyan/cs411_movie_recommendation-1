import React from "react";
import StarRatingComponent from "react-star-rating-component";
import UserRatingService from "../api/UserRatingService";
import Authentication from "./Authentication";
import moment from "moment";

import UserReviewService from "../api/UserReviewService";

class RatingComponent extends React.Component {
  //   private int rating;
  //   private Date rating_date;
  //   private int movies_id;
  //   private int users_id;

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      //   rate_date: "",
      rating_date:
        moment(new Date()).format("YYYY-MM-DD") + "T00:00:00.000+0000",
      //   user_id: "",
      movies_id: this.props.movie_id,
      users_id: 0
    };
    this.onStarClick = this.onStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    console.log("Movie info in rating");
    console.log(this.state);

    this.setState({ rating: nextValue });
    let username = Authentication.getLoggedInUserName("authenticatedUser");
    UserReviewService.retrieveUserInfo(username)
      .then(Response => {
        this.setState({
          rating: nextValue,
          rating_date:
            moment(new Date()).format("YYYY-MM-DD") + "T00:00:00.000+0000",
          movies_id: this.props.movie_id,
          users_id: Response.data.user_id
        });
      })
      .catch(Error => {});

    console.log(this.state);
  }

  handleSubmit = event => {
    event.preventDefault();
    const { ratinginfo } = this.state;

    UserRatingService.updateRating(ratinginfo)
      .then(Response => {})
      .catch(Error => {});
  };

  render() {
    const { rating } = this.state;

    return (
      <div>
        <h4>Rate the movie: {rating} 🌟</h4>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />

        <button className="btn btn-success btn-lg " onClick={this.handleSubmit}>
          Submit My Rating
        </button>
      </div>
    );
  }
}

export default RatingComponent;
