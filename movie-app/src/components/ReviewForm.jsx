import React, { Component } from "react";
import { Form } from "formik";
class ReviewForm extends Component {
  render() {
    return (
      <div>
        <Form>
          Review
          <br />
          <textarea
            type="text"
            rows="4"
            cols="100"
            onChange={this.props.onChange}
            id="review-text"
          />
          <br />
          <button
            className="btn btn-success "
            onClick={event => this.props.onSubmit(event)}
          >
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

export default ReviewForm;
