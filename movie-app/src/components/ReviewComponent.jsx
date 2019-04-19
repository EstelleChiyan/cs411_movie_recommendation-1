import React, { Component } from "react";
import moment from "moment";
import UserReviewService from "../api/UserReviewService";

import { Form } from "formik";
class ReviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit = event => {
    let review = {};
    let id = this.props.match.params.id;
    let uid = 0;
    UserReviewService.retrieveReviewsByReviewId(id).then(Response => {
      const data = Response.data;
      console.log(data);
      review.post_date = moment(new Date()).format("YYYY-MM-DD");
      review.id = id;
      review.user_id = data.user_id;
      review.movie_id = data.movie_id;
      review.content = this.state.content;
      uid = data.user_id;
      UserReviewService.updateReview(id, review);
    });
    this.props.history.push(`/reviews/${uid}`);
    this.props.history.go();
  };

  render() {
    return (
      <div>
        <h2>My Review</h2>
        <Form>
          <div className="form-group">
            <textarea
              rows="4"
              cols="100"
              value={this.state.content}
              onChange={event => this.handleChange(event)}
            />
          </div>
        </Form>
        <div>
          <button
            className="btn btn-success btn-lg "
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default ReviewComponent;
