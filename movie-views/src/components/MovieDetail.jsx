import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, Icon } from "semantic-ui-react";
import Box from "./styles/Box";
import DottedBox from "./styles/DottedBox";
import DashedBox from "./styles/DashedBox";
import OutsetBox from "./styles/OutsetBox";
// import styled from "styled-components";
import { Row, Col, Rate, Tag } from "antd";
import YouTube from "react-youtube";
// import MoviePoster from "./MoviePoster.js";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { amovie: {} };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios.get(`http://127.0.0.1:8080/movies/${params.id}`).then(res => {
      this.setState({ amovie: res.data });
    });
  }

  render() {
    const { amovie } = this.state;
    if (!amovie) return <p>Loading Data</p>;

    const style = {
      paddingLeft: "15px"
    };

    const opts = {
      height: "260",
      width: "460",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <div style={style}>
        <Row>
          <Col span={8} offset={1}>
            <img
              alt={amovie.title}
              width="20%"
              src={`http://image.tmdb.org/t/p/w185/${amovie.poster_path}`}
            />
          </Col>
          <Col span={12} offset={1}>
            <h1>{amovie.title}</h1>
            <hr />
            <strong> Description: </strong>

            <p class="summary">{amovie.overview}</p>
            <hr />
            <div className="genere">
              <span className="genereTitle">
                <strong>Generes: </strong>
              </span>
            </div>
            <Rate className="rate" value={amovie.vote_average} />

            <hr />
            <strong> Date: </strong>
            <p>{amovie.release_date} </p>
            <hr />
            <strong> Runtime: </strong>
            <p>{amovie.runtime} minutes</p>
            <hr />
            <strong> Language: </strong>
            <p>{amovie.original_language}</p>

            <hr />
            <div className="trailer">
              <strong> Trailer: </strong>
            </div>
            <YouTube
              // videoId={"https://www.youtube.com/watch?v=" + this.props.id}
              videoId="YEckl7btUlQ"
              opts={opts}
            />
          </Col>
        </Row>

        <DottedBox>Cool</DottedBox>
        <DashedBox>hi</DashedBox>
        <OutsetBox>Cool</OutsetBox>
        <Box>Cool</Box>

        <Modal.Actions>
          <Link to="/">
            <Button basic color="black" icon labelPosition="left">
              Go Back to Home Page
              <Icon name="left arrow" />
            </Button>
          </Link>
        </Modal.Actions>
      </div>
    );
  }
}

export default MovieDetail;
