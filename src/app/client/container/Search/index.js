import React, { Component } from 'react';
import Item from '../../layout/SearchItem';
import SearchBar from '../../layout/SearchBar';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      keyword: this.props.location.query.q
    };
  }
  render() {
    const results = this.state.results.map(r => <Item key={r.title} {...r} />);
    return (
      <div className="Search container-fluid">
        <h3> Search results for <code>{this.state.keyword}</code> </h3>
        <SearchBar value={this.state.keyword} />
        <article>
          {results}
        </article>
      </div>
    );
  }
  componentDidMount() {
    fetch('/entity.json')
    .then(r => r.json())
    .then(results => {
      this.setState({ results });
    })
    .catch(error => console.log(error));
  }
}