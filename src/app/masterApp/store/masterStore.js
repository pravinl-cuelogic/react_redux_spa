import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';
import { initialStates } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default props => {
  // This is how we get initial props Rails into redux.
  const state_from_props = props;
  const { $$masterState } = initialStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$masterStore: $$masterState.merge(state_from_props),
  };

  const reducer = combineReducers(reducers);
  const composedStore = composeWithDevTools(applyMiddleware(thunkMiddleware));
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      try {
        const NextReducers = require('../reducers').default;
        store.replaceReducer(combineReducers(NextReducers));
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${ error }`);
      }
    });
  }

  return store;
};
