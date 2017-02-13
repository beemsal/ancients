import React, { PropTypes } from 'react';

export default class AncientSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    const {
      doSearch,
      fetchError
    } = this.props;

    const {
      searchTerm
    } = this.state;

    return (
      <fieldset>
        <input
          id="search"
          name="search"
          type="text"
          value={searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
        />
        <button
          className="btn btn-primary"
          onClick={() => doSearch(searchTerm)}
        >Search</button>
        <button
          className="btn btn-danger"
          onClick={fetchError}
        >Get Error</button>
      </fieldset>
    );
  }
}

AncientSearch.propTypes = {
  doSearch: PropTypes.func.isRequired,
  fetchError: PropTypes.func.isRequired
};
