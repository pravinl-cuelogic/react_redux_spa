import PropTypes from 'prop-types';
import React from 'react';
import * as MiraiUtil from '../../Util/MiraiUtil';

export default class Loading extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    customLoadingText: PropTypes.string,
  };

  render() {
    const { loading, customLoadingText } = this.props;

    const getLoadingText = () => {
      if (loading == true) {
        if (customLoadingText == undefined) {
          return 'Loading...';
        }

        return customLoadingText;
      }
      return '';
    };

    const loadingText = getLoadingText();

    return (
      <div>
        <h5> {loadingText} </h5>
      </div>
    );
  }
}
