import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, Icon } from "semantic-ui-react";
import OutsetBox from "./styles/OutsetBox";
import { Row, Col, Rate } from "antd/lib";
import ReviewApp from "./ReviewApp";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: {} };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=cfe422613b250f702980a3bbf9e90716`
      )
      .then(res => {
        this.setState({ movie: res.data });
      });
  }

  render() {
    const { movie } = this.state;
    if (!movie) return <p>Loading Data</p>;

    const style = {
      paddingLeft: "15px",
      textAlign: "left",
      margin: "2% auto 5%"
    };

    const Emoji = props => (
      <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
      >
        {props.symbol}
      </span>
    );

    return (
      <div style={style}>
        <Row>
          <Col span={8} offset={1}>
            <img
              alt={movie.title}
              width="85%"
              src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          </Col>
          <Col span={12} offset={1}>
            <h1>
              {" "}
              <Emoji label="sheep" symbol="🤩" /> {movie.title}
            </h1>
            <hr />

            <OutsetBox>Cool</OutsetBox>

            <p className="summary">{movie.overview}</p>
            <hr />

            <div className="genere">
              <span className="genereTitle">
                <strong>Generes: </strong>
              </span>
            </div>
            <hr />

            <strong>Rating: </strong>
            <Rate className="rate" value={movie.vote_average} />
            <hr />

            <strong> Date: </strong>
            <p>{movie.release_date} </p>
            <hr />

            <strong> Language: </strong>
            <p>{movie.original_language}</p>
            <hr />

            <strong> Runtime: </strong>
            <p>{movie.runtime} minutes</p>
          </Col>
        </Row>
        <hr />

        <Col span={12} offset={1}>
          <Modal.Actions>
            <Link to="/">
              <Button basic color="black" icon labelPosition="left">
                Go Back to Home Page
                <Icon name="left arrow" />
              </Button>
            </Link>
          </Modal.Actions>
        </Col>

        <ReviewApp movie_id={this.props.match.params.id} />
      </div>
    );
  }
}

export default MovieDetail;
