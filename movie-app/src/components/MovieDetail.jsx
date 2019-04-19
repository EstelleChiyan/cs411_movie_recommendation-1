import React, { Component } from "react";
import moment from "moment";
import ReviewApp from "./ReviewApp";
import RatingComponent from "./RatingComponent";
import "./styles/Movie.css";
import MovieInfo from "./MovieInfo";
import Authentication from "./Authentication";
import MovieService from "../api/MovieService";
import UserReviewService from "../api/UserReviewService";
import Movie from "./Movie";
import WordcloudComponent from "./WordcloudComponent";
import WordcloudCusComponent from "./WordcloudCusComponent";
import { Row, Col, Rate } from "antd/lib";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      votes: [],
      avg: 0,
      vote: {
        rating: null,
        rating_date: null,
        user_id: null,
        movie_id: null
      }
    };
  }

  async componentDidMount() {
    let movie = {};
    let vote = this.state.vote;
    let votes = [];

    let username = await Authentication.getLoggedInUserName();
    vote.movie_id = this.props.match.params.id;

    await UserReviewService.retrieveUserInfo(username).then(res => {
      const unserInfo = res.data;
      console.log("ywwy");
      console.log(unserInfo);
      vote.user_id = unserInfo.id;
    });

    await MovieService.getMovieDetailById(this.props.match.params.id).then(
      res => {
        movie = res.data;
      }
    );

    await MovieService.getRatingDetailById(this.props.match.params.id).then(
      res => {
        votes = res.data;
      }
    );

    MovieService.getRatingByUserAndMovie(vote.user_id, vote.movie_id).then(
      res => {
        vote.rating = res.data.rating;
        vote.rating_date = res.data.rating;
      }
    );

    let avg = await this.calculateVoteAvg(votes);
    this.setState({ vote: vote, movie: movie, votes: votes, avg: avg });
  }

  calculateVoteAvg = votes => {
    let sum = 0;
    let count = 0;

    for (var i = 0; i < votes.length; i++) {
      sum += votes[i].rating;
      count += 1;
    }

    if (count === 0) return 0;
    else return sum / count;
  };

  handleSubmit = event => {
    let votes = [];
    let vote = this.state.vote;
    Object.assign(votes, this.state.votes);

    vote.rating_date = moment(new Date()).format("YYYY-MM-DD");
    vote.rating = event;
    MovieService.addRating(vote);

    votes.push(vote);
    let avg = this.calculateVoteAvg(votes);
    this.setState({ vote: vote, votes: votes, avg: avg });
  };

  render() {
    let wcComponent = null;
    if (this.state.vote.user_id)
      wcComponent = (
        <WordcloudCusComponent
          user_id={this.state.vote.user_id}
          movie_id={this.props.match.params.id}
        />
      );
    else
      wcComponent = (
        <WordcloudComponent movie_id={this.props.match.params.id} />
      );
    return (
      <div>
        <MovieInfo movie={this.state.movie} avg={this.state.avg} />
        <Row>
          <Col span={8} offset={1}>
            <RatingComponent
              onChange={event => this.handleSubmit(event)}
              vote={this.state.vote}
            />
          </Col>
          <Col span={12} offset={1}>
            {wcComponent}
          </Col>
        </Row>
        <ReviewApp movie_id={this.props.match.params.id} />
      </div>
    );
  }
}

export default MovieDetail;
