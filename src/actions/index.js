import * as actions from '../constants/actionTypes';
export function recordPattern(pattern) {
  return {type: actions.RECORD_PATTERN, payload: pattern};
}
