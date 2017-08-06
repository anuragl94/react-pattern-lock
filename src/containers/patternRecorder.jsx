import React, {Component} from 'react'
import {PatternInput} from '../components/inputs.jsx'

class PatternRecorder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pattern: [],
      confirmed: false,
      error: null
    }
  }
  savePassword (pattern) {
    window.localStorage.setItem('pattern', JSON.stringify(pattern))
  }
  handlePattern (pattern) {
    this.setState(function (prevState) {
      let newState = Object.assign({}, prevState, {error: null})
      if (pattern.length >= 4) {
        if (!prevState.pattern.length) {
          // Pattern entered for the first time
          newState.pattern = pattern
        } else if (!prevState.confirmed) {
          // Confirming pattern
          newState.confirmed = (prevState.pattern.length === pattern.length) &&
          prevState.pattern.map((item, index) => {
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
    })
  }
  render () {
    if (!this.state.confirmed) {
      return (
        <div>
          <div>{
            !this.state.pattern.length
            ? 'Please enter a pattern to save as your password'
            : 'Enter the same pattern to confirm'
          }</div>
          <PatternInput value={this.state.pattern} rows='3' columns='3' events={{
            change: this.handlePattern.bind(this)
          }} />
          <div>{this.state.error}</div>
        </div>
      )
    } else {
      return (
        <div>
          You pattern has been recorded &#x2713;
        </div>
      )
    }
  }
}

export default PatternRecorder
