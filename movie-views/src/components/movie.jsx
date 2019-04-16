import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Card } from "antd";

class Movie extends Component {
  render() {
    return (
      <div className="movie">
        <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img
              alt={this.props.title}
              width="100%"
              src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`}
            />
          </div>
          <div className="custom-card">
            <a href={"/movies/" + this.props.id}>
              <div className="movie_title">{this.props.title}</div>
            </a>

            <p>{`Date: ${this.props.release_date} || Votes: ${
              this.props.vote_average
            }`}</p>
          </div>
        </Card>
      </div>
    );
  }
}

export default Movie;
