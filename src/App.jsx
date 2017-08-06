import React, {Component} from 'react'
import PatternRecorder from './containers/patternRecorder.jsx'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {pattern} from './reducers'

const reducer = combineReducers({pattern})
const store = createStore(reducer)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PatternRecorder />
      </Provider>
    )
  }
}

export default App
