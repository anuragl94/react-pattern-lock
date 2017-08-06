import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {PatternInput} from '../components/inputs.jsx'
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class PatternRecorder extends Component {
  static propTypes = {
    pattern: PropTypes.array,
    dispatch: PropTypes.func,
    confirmed: PropTypes.bool,
    error: PropTypes.any
  };
  constructor (props) {
    super(props)
  }
  savePassword (pattern) {
    window.localStorage.setItem('pattern', JSON.stringify(pattern))
  }
  handlePattern (pattern) {
    this.props.dispatch(actions.recordPattern(pattern));
  }
  render () {
    if (!this.props.confirmed) {
      return (
        <div>
          <div>{
            !this.props.pattern.length
            ? 'Please enter a pattern to save as your password'
            : 'Enter the same pattern to confirm'
          }</div>
          <PatternInput value={this.props.pattern} rows='3' columns='3' events={{
            change: this.handlePattern.bind(this)
          }} />
          <div>{this.props.error}</div>
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

export default connect((state) => {
  return {
      pattern: state.pattern,
      confirmed: state.confirmed,
      error: state.error
  };
})(PatternRecorder);
