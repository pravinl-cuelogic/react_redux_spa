import Immutable from 'immutable';

import actionTypes from '../constants/masterAppConstants';

export const $$initialState = Immutable.fromJS({
  posts: [],
  nextState: {},
});

export default function masterReducer($$state = $$initialState, action) {
  const { type, val } = action;
  switch (type) {
    case actionTypes.UPDATE_POSTS:
      return $$state.set('posts', val);
    default:
      return $$state;
  }
}
