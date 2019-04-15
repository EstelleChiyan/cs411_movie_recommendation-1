import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <form className="search">
        <input
          type="text"
          value={this.props.query}
          placeholder={this.props.placeholder}
          onChange={e => this.props.onChange(e)}
        />
      </form>
    );
  }
}

export default Search;
