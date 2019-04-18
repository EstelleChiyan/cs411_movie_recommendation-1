import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Icon } from "semantic-ui-react";
import OutsetBox from "./styles/OutsetBox";
import { Row, Col, Rate } from "antd/lib";
import moment from "moment";
import ReviewApp from "./ReviewApp";
import RatingComponent from "./RatingComponent";
import "./styles/Movie.css";
import MovieInfo from "./MovieInfo";
import Authentication from "./Authentication";
import MovieService from "../api/MovieService";
import UserReviewService from "../api/UserReviewService";
import Movie from "./Movie";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: [],
      vote: {
        rating: null,
        rating_date: null,
        movies_id: props.match.params.id,
        users_id: null
      }
    };
  }

  componentDidMount() {
    MovieService.getRatingDetailById(this.props.match.params.id).then(res => {
      const votes = res.data;
      this.setState({ votes });
    });

    let vote = this.state.vote;
    let username = Authentication.getLoggedInUserName("authenticatedUser");
    UserReviewService.retrieveUserInfo(username).then(Response => {
      const userInfo = Response.data;
      vote.users_id = userInfo.id;
      this.setState({ vote });
    });

    console.log(this.state.review);
  }

  handleSubmit = event => {
    let votes = [];
    let vote = {};
    Object.assign(votes, this.state.votes);
    vote.rating_date = moment(new Date()).format("YYYY-MM-DD");
    vote.rating = event;
    MovieService.addRating(vote);
    votes.push(vote);
    this.setState({ vote }, { votes });

    console.log(event);
  };

  render() {
    return (
      <div>
        <MovieInfo
          movie_id={this.props.match.params.id}
          votes={this.state.votes}
        />
        <RatingComponent vote={this.state.vote} onSubmit={this.handleSubmit} />
        <ReviewApp movie_id={this.props.match.params.id} />
      </div>
    );
  }
}

export default MovieDetail;
