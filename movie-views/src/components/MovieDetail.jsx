import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, Icon } from "semantic-ui-react";
import OutsetBox from "./styles/OutsetBox";
// import styled from "styled-components";

import { Row, Col, Rate } from "antd/lib";
import RatingComponent from "./RatingComponent";
// import { Row, Col, Layout, Sider, Rate, Content } from "antd/lib";
// import YouTube from "react-youtube";

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
    // const opts = {
    //   height: "260",
    //   width: "460",
    //   playerVars: {
    //     // https://developers.google.com/youtube/player_parameters
    //     autoplay: 0
    //   }
    // };

    return (
      <div style={style}>
        <Row>
          <Col span={8} offset={1}>
            <img
              alt={amovie.title}
              width="85%"
              src={`http://image.tmdb.org/t/p/w500/${amovie.poster_path}`}
            />
          </Col>
          <Col span={12} offset={1}>
            <h1>
              {" "}
              <Emoji label="sheep" symbol="🤩" /> {amovie.title}
            </h1>
            <hr />

            <OutsetBox>Cool</OutsetBox>

            <p class="summary">{amovie.overview}</p>
            <hr />

            <div className="genere">
              <span className="genereTitle">
                <strong>Generes: </strong>
              </span>
            </div>
            <hr />

            <strong>Rating: </strong>
            <Rate className="rate" value={amovie.vote_average} />
            <hr />

            <strong> Date: </strong>
            <p>{amovie.release_date} </p>
            <hr />

            <strong> Language: </strong>
            <p>{amovie.original_language}</p>
            <hr />

            <strong> Runtime: </strong>
            <p>{amovie.runtime} minutes</p>
            <hr />

            <RatingComponent movie_id={this.props.match.params.id} />
          </Col>
        </Row>
        <hr />

        <Col span={12} offset={1}>
          <p>
            <Modal.Actions>
              <Link to="/">
                <Button basic color="black" icon labelPosition="left">
                  Go Back to Home Page
                  <Icon name="left arrow" />
                </Button>
              </Link>
            </Modal.Actions>
          </p>
        </Col>
      </div>
    );
  }
}

export default MovieDetail;
