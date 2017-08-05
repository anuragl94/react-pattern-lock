function setPattern (value, rows, columns) {
  return {
    type: 'SET_PATTERN',
    value
  }
}

function clearPattern () {
  return {
    type: 'CLEAR_PATTERN'
  }
}

export {setPattern, clearPattern}
