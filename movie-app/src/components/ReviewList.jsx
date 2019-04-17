import React, { Component } from "react";
import ReviewItem from "./ReviewItem";

class ReviewList extends Component {
  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>review</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.reviews.map(review => (
              <ReviewItem {...review} key={review.id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReviewList;
