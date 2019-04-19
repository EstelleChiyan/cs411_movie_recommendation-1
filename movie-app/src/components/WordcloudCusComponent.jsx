import React, { Component } from "react";
import ReactWordcloud from "react-wordcloud";
import WordCloudService from "../api/WordCloudService";
class WordcloudCusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
  }

  componentDidMount() {
    let user_id = this.props.user_id;
    let movie_id = this.props.movie_id;
    WordCloudService.retrieveWordcountByUserId(user_id, movie_id).then(
      Response => {
        console.log(Response);
        this.setState({
          words: Response.data
        });
      }
    );
  }

  render() {
    console.log(this.state.words);
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

export default WordcloudCusComponent;
