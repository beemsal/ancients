import React, { PropTypes } from 'react';

import AncientDetail from './AncientDetail';

export default class AncientList extends React.Component {

  constructor() {
    super();
    this.state = {
      search: true
    };
  }

  render() {
    const {
      ancients
    } = this.props;

    return (
      <div>
        <table className="table table-condensed table-hover table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Superpower</th>
              <th>End of an Era</th>
            </tr>
          </thead>
          <tbody>
            { (ancients.length > 0)
              ? (ancients).map(ancient => <AncientDetail key={ancient.name} ancient={ancient} />)
              : <tr><td colSpan="3">No Ancients Found</td></tr> }
          </tbody>
        </table>
      </div>
    );
  }
}

AncientList.propTypes = {
  ancients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    superpower: PropTypes.string.isRequired,
    end_of_an_era: PropTypes.string.isRequired
  }))
};

AncientList.defaultProps = {
  ancients: []
};
