import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./styles/Search.css";
import MovieSearchService from "../api/MovieSearchService";
import { Link } from "react-router-dom";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      userInput: "",
      movie_id: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // let movieName = this.state.userInput;
    console.log(this.state.movie_id);
    // this.props.history.push(`/movies/${this.state.movie_id}`);
  }

  onChange = e => {
    const { suggestions } = this.props;

    this.setState({
      activeSuggestion: 0,
      //filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });

    if (this.state.userInput.length > 0) {
      MovieSearchService.retrieveMovieSearch(this.state.userInput).then(
        Response => {
          this.setState({
            filteredSuggestions: Response.data
          });
        }
      );
    }
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    MovieSearchService.retrieveMovieByName(e.currentTarget.innerText)
      .then(Response => {
        this.setState({
          movie_id: Response.data.id
        });
      })
      .catch(Error => {});
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // Update the input and close the suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          className="form-control mr-sm-2"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}

        <Link to={`/movies/${this.state.movie_id}`}>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.handleSubmit}
          >
            Search!
          </button>
        </Link>
      </Fragment>
    );
  }
}

export default Autocomplete;
