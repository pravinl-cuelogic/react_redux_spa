import React from 'react';
import PropTypes from 'prop-types';

export default class LoadError extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  };
  render() {
    const { message } = this.props;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            {message}
          </div>
        </div>
      </div>

    );
  }
}
