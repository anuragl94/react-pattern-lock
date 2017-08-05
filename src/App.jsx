import React, {Component} from 'react'
import PatternInput from './components/inputs.jsx'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {pattern} from './reducers'

const reducer = combineReducers({pattern})
const store = createStore(reducer)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pattern: []
    }
  }
  render () {
    return (
      <Provider store={store}>
        <div>
          <PatternInput rows='3' columns='3' events={{
            change: console.info
          }} />
          {/* {this.state.pattern.length ? <div>Done &#x2713;</div> : null} */}
        </div>
      </Provider>
    )
  }
}
export default App
