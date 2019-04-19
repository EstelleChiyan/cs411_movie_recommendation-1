import React from "react";
import StarRatingComponent from "react-star-rating-component";
import UserRatingService from "../api/UserRatingService";
import Authentication from "./Authentication";
import { Button } from "antd";
import { Rate } from "antd/lib";

import UserReviewService from "../api/UserReviewService";

class RatingComponent extends React.Component {
  render() {
    let star = null;
    if (!this.props.vote.user_id) star = <Rate disabled value={0} />;
    else if (this.props.vote.rating)
      star = <Rate disabled value={this.props.vote.rating} />;
    else star = <Rate onChange={event => this.props.onChange(event)} />;

    return (
      <div>
        Put your rating
        <p />
        {star}
      </div>
    );
  }
}

export default RatingComponent;
