import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Icon } from "semantic-ui-react";
import OutsetBox from "./styles/OutsetBox";
import { Row, Col, Rate } from "antd/lib";
import MovieInfoTag from "./MovieInfoTag";

import "./styles/Movie.css";

class MoiveInfo extends Component {
  render() {
    if (!this.props.movie) return <p>Loading Data</p>;

    return (
      <div className="style">
        <Row>
          <Col span={8} offset={1}>
            <img
              alt={this.props.movie.title}
              width="85%"
              src={`https://image.tmdb.org/t/p/w500${
                this.props.movie.poster_path
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
            <h1> {this.props.movie.title}</h1>
            <hr />
            <OutsetBox>Cool</OutsetBox>
            <p className="summary">{this.props.movie.overview}</p>
            <hr />
            <strong>Generes: </strong>
            <MovieInfoTag tags={this.props.tags} />
            <hr />
            <strong>Score: </strong>
            <Rate disabled value={~~this.props.avg} />
            <hr />
            <strong> Date: </strong>
            {this.props.movie.release_date}
            <hr />
            <strong> Language: </strong>
            {this.props.movie.original_language}
            <hr />
            <strong> Runtime: </strong>
            {this.props.movie.runtime} minutes
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}
export default MoiveInfo;
