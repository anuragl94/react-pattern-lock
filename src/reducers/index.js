import * as actions from '../constants/actionTypes';
import { createStore } from 'redux';

const rootReducer = function (state = {}, action) {
  switch (action.type) {
  case actions.RECORD_PATTERN:
    let newState = Object.assign({}, state, {error: null})
    const pattern = action.payload;
    if (pattern.length >= 4) {
      if (!state.pattern.length) {
        // Pattern entered for the first time
        newState.pattern = pattern
      } else if (!state.confirmed) {
        // Confirming pattern
        newState.confirmed = (state.pattern.length === pattern.length) &&
          state.pattern.map((item, index) => {
            return [item, pattern[index]]
          }).reduce((acc, pair) => {
            return acc && (pair[0] === pair[1])
          })
        if (!newState.confirmed) {
          newState.error = 'Pattern does not match'
        }
      }
    } else {
      newState.error = 'Join at least 4 dots'
    }
    return newState
  default:
    return state
  }
}

export default createStore(rootReducer, {
  pattern: [],
  confirmed: false,
  error: null
});
