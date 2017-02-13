import React from 'react';
import fetch from 'isomorphic-fetch';

import AncientSearch from './AncientSearch';
import AncientList from './AncientList';

const TARGET = 'https://athena-7.herokuapp.com/ancients.json';

export default class AncientListContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      ancients: [],
      errorMessage: null,
      searchTerm: ''
    };
  }

  /**
   * Request the ancients via a fetch request.
   *
   */
  componentWillMount() {
    this.fetchAncients();
  }

  /**
   * Get the result JSON from session storage or fetch from API
   *
   * @param {string} - search term used to query session storage
   */
  getAncients = (searchTerm) => {
    if (searchTerm) {
      let ancients = sessionStorage.getItem(searchTerm);
      if (ancients) {
        ancients = JSON.parse(ancients);
        // console.info(`Returning data from local storage for search term ${searchTerm}`);
        this.setState({ ancients });
        return;
      }
    }

    this.fetchAncients();
  }

  /**
   * Fetch the result JSON from the API
   *
   */
  fetchAncients = () => {
    const {
      searchTerm
    } = this.state;

    const searching = !!(searchTerm.length > 0);

    let target = TARGET;
    if (searching) {
      target += `?search=${searchTerm}`;
    }

    fetch(target)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((results) => {
        let ancients = results;
        if (searching) {
          ancients = results.ancients;

          // store in sessionStorage if populated
          if (ancients.length > 0) {
            sessionStorage.setItem(searchTerm, JSON.stringify(ancients));
          }
        }
        this.setState({ ancients });
      });
  }

  /**
   * Set the searchTerm and populate state with response.
   *
   * @param {string} - search string used to query api
   */
  doSearch = (searchTerm) => {
    const errorMessage = null;
    this.setState({ searchTerm, errorMessage }, () => this.getAncients(searchTerm));
  }

  /**
   * Fetch the error message from the server
   */
  fetchError = () => {
    const target = `${TARGET}?error=true`;

    fetch(target)
      .then((response) => {
        if (response.status !== 422) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((results) => {
        this.setState({ errorMessage: results.error });
      });
  }

  render() {
    const {
      errorMessage
    } = this.state;

    return (
      <div id="ancient-list">
        <h1 className="title">Ancients</h1>
        {(errorMessage) ? <p className="text-danger">{errorMessage}</p> : null}
        <AncientSearch
          doSearch={this.doSearch}
          fetchError={this.fetchError}
        />
        <AncientList {...this.state} />
      </div>
    );
  }
}
