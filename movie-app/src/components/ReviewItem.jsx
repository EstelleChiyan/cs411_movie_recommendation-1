import React, { Component } from "react";

class ReviewItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.content}</td>
        <td>{this.props.post_date}</td>
      </tr>
    );
  }
}

export default ReviewItem;
