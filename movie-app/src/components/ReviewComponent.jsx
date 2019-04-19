import React, { Component } from "react";
import moment from "moment";
import UserReviewService from "../api/UserReviewService";

import { Form } from "formik";
class ReviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      content: "",
      post_date: moment(new Date()).format("YYYY-MM-DD"),
      movie_id: "",
      user_id: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit(event) {
    let id = this.state.id;
    //console.log(id)
    UserReviewService.retrieveReviewsByReviewId(id).then(Response => {
      this.setState({
        movie_id: Response.data.movie_id,
        user_id: Response.data.user_id
      });
    });
    console.log(this.state);
    UserReviewService.updateReview(this.state.id, this.state)
      .then(Response => {
        console.log(Response);
      })
      .catch(Error => {});
  }

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
              onChange={this.handleChange}
            >
              {/* {this.state.content} */}
            </textarea>
          </div>
        </Form>
        <div>
          {/* <button className="btn btn-primary btn-lg btn-space"  onClick={this.invertClicked}>Invert</button> */}

          <button
            className="btn btn-success btn-lg "
            onClick={this.handleSubmit}
          >
            DoubleToSubmit
          </button>
        </div>
      </div>
    );
  }
}
export default ReviewComponent;
