const pattern = function (state = [], action) {
  switch (action.type) {
    case 'SET_PATTERN':
      return action.value
    case 'CLEAR_PATTERN':
      return []
    default:
      return state
  }
}

export {pattern}
