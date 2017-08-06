import React, {Component} from 'react'
import PatternRecorder from './containers/patternRecorder.jsx'
import {Provider} from 'react-redux'
import store from './reducers';

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
