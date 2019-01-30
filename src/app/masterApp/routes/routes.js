import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { bindActionCreators } from 'redux';
import * as masterActionCreators from '../actions/masterActionCreators';
// import PageLoading from '../../common/components/Loading';
// import LoadingAnimation from '../../common/Loaders/LoadingAnimation';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return {
    $$masterStore: state.$$masterStore,
  };
}

const Loading = () => {
  return(<div>Loading...</div>);
}

// React loadable helps in splitting the JSX views.
// Any import is split by webpack by default as a separate JS file
function MyLoadable(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 200,
    timeout: 10,
  }, opts));
}

const HomeApp = MyLoadable({
  loader: () => import('../containers/Blog/Posts/Posts'),
  render(loaded, props) {
    const HomeContainer = loaded.default;
    return (
      <HomeContainer { ...props } />
    );
  },
});

const NewPostApp = MyLoadable({
  loader: () => import('../containers/Blog/NewPost/NewPost'),
  render(loaded, props) {
    const NewPostContainer = loaded.default;
    return (
      <NewPostContainer { ...props } />
    );
  },
});

const FullPostApp = MyLoadable({
  loader: () => import('../containers/Blog/FullPost/FullPost'),
  render(loaded, props) {
    const FullPostContainer = loaded.default;
    return (
      <FullPostContainer { ...props } />
    );
  },
});

class MyAppRoutes extends Component {

  componentWillMount() {
    // I18n.locale = this.props.$$masterStore.get('i18n_locale');
  }
  componentDidMount() {
    const masterActions = bindActionCreators(masterActionCreators, this.props.dispatch);
    const { updateNextState } = masterActions;
    // Some basic global functions pushed to window
    // So that it can be accessed elsewhere
    // window.updateNextPathName = updateNextPathName;
    window.updateNextState = updateNextState;
    window.masterDispatch = this.props.dispatch;
    window.rrHistory = this.props.history;
  }

  render() {
    const { $$masterStore, dispatch, location } = this.props;
    // const masterActions = bindActionCreators(masterActionCreators, this.props.dispatch);
    // const { posts, nextState } = $$masterStore;
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ HomeApp } />
          <Route exact path="/new-post" component={NewPostApp} />
          <Route exact path="/:id" component={FullPostApp} />
        </Switch>
      </div>
    );
  }
}

MyAppRoutes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  $$masterStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(connect(select)(MyAppRoutes));
