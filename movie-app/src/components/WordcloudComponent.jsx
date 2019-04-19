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
    WordCloudService.retrieveWordcountByMovieId(this.props.movie_id).then(
      Response => {
        //words: Response.data
        this.setState({
          words: Response.data
        });
      }
    );
  }

  render() {
    console.log("this.state.words");
    console.log(this.state.words);
    return (
      <div>
        <ReactWordcloud words={this.state.words} />
      </div>
    );
  }
}

export default WordcloudComponent;
