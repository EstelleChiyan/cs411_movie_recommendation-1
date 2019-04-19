import React, { Component } from "react";
import ReactWordcloud from "react-wordcloud";
import WordCloudService from "../api/WordCloudService";
class WordcloudComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_id: this.props.movie_id,
      words: []
    };
  }

  componentDidMount() {
    WordCloudService.retrieveWordcountByMovieId(this.props.movie_id)
      .then(Response => {
        this.setState({
          words: Response.data
        });
      })
      .catch();
  }

  render() {
    return (
      <div>
        <ReactWordcloud
          words={this.state.words}
          minSize={[400, 200]}
          size={[100, 200]}
        />
      </div>
    );
  }
}

export default WordcloudComponent;
