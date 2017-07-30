import React, {Component} from 'react'
import {PatternInput} from './components/inputs.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pattern: []
    }
  }
  render () {
    return (
      <div>
        <PatternInput rows='3' columns='3' events={{
          change: (pattern) => { this.setState({pattern}) }
        }} />
        {this.state.pattern.length ? <div>Done &#x2713;</div> : null}
      </div>
    )
  }
}
export default App
