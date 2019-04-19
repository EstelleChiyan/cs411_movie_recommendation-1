import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, Icon } from "semantic-ui-react";
import OutsetBox from "./styles/OutsetBox";
import { Row, Col, Rate } from "antd/lib";

import ReviewApp from "./ReviewApp";
import RatingComponent from "./RatingComponent";
import MovieService from "../api/MovieService";
import "./styles/Movie.css";

class MoiveInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: {} };
  }

  componentDidMount() {
    console.log(this.props.movie_id);
    const id = this.props.movie_id;
    MovieService.getMovieDetailById(id).then(Response => {
      const movie = Response.data;
      this.setState({ movie });
    });
  }

  render() {
    if (!this.state.movie) return <p>Loading Data</p>;

    return (
      <div className="style">
        <Row>
          <Col span={8} offset={1}>
            <img
              alt={this.state.movie.title}
              width="85%"
              src={`http://image.tmdb.org/t/p/w500/${
                this.state.movie.poster_path
              }`}
            />
            <p />
            <Modal.Actions>
              <Link to="/">
                <Button basic color="black" icon labelPosition="left">
                  Go Back to Home Page
                  <Icon name="left arrow" />
                </Button>
              </Link>
            </Modal.Actions>
          </Col>
          <Col span={12} offset={1}>
            <h1> {this.state.movie.title}</h1>
            <hr />
            <OutsetBox>Cool</OutsetBox>
            <p className="summary">{this.state.movie.overview}</p>
            <hr />
            <div className="genere">
              <span className="genereTitle">
                <strong>Generes: </strong>
              </span>
            </div>
            <hr />
            <strong>Score: </strong>
            <Rate disabled value={2} />
            <hr />
            <strong> Rate the movie </strong>
            <hr />
            <strong> Date: </strong>
            {this.state.movie.release_date}
            <hr />
            <strong> Language: </strong>
            {this.state.movie.original_language}
            <hr />
            <strong> Runtime: </strong>
            {this.state.movie.runtime} minutes
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}
export default MoiveInfo;
