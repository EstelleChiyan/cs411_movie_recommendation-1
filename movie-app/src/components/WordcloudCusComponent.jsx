import React, { Component } from "react";
import ReactWordcloud from "react-wordcloud";
import WordCloudService from "../api/WordCloudService";
class WordcloudCusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      movie_id: this.props.movie_id,
      words: []
    };
  }

  componentDidMount() {
    WordCloudService.retrieveWordcountByMovieId(
      this.props.user_id,
      this.props.movie_id
    ).then(Response => {
      this.setState({
        words: Response.data
      });
    });
  }

  render() {
    return (
      <div>
        <ReactWordcloud words={this.state.words} />
      </div>
    );
  }
}

export default WordcloudCusComponent;
