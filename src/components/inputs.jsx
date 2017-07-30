import React, {Component} from 'react'

const ButtonInput = function (props) {
  return (
    <span
      onMouseOver={props.events.mouseover}
      onMouseDown={props.events.mousedown}
    >
      {props.active ? 'x' : 'o'}
    </span>
  )
}

class PatternInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: [],
      mousedown: false,
      done: false
    }
  }
  addToPattern (value) {
    this.setState(function (prevState) {
      let newState = Object.assign({}, prevState)
      if (newState.value.indexOf(value) === -1) {
        newState.value.push(value)
      }
      return newState
    })
  }
  clearPatern () {
    this.setState({
      value: []
    })
  }
  componentDidMount () {
    let _this = this
    document.addEventListener('mouseup', function (e) {
      let stateUpdates = {
        mousedown: false
      }
      if (_this.state.value.length >= 4) {
        stateUpdates.done = true
        _this.props.events.change(_this.state.value)
      } else {
        stateUpdates.value = []
      }
      _this.setState(stateUpdates)
    })
  }
  componentWillUnmount () {
    document.removeEventListener('mouseup')
  }
  render () {
    let columns = Number(this.props.columns) || 3
    let rows = Number(this.props.rows) || 3
    return (
      <div
        className='pattern-container'
        onMouseDown={(e) => { this.setState({mousedown: true}) }}
      >
        {
          Array(rows).fill(0).map((_, row) => (
            <div key={row}>
              {
                Array(columns).fill(0).map((_, col) => {
                  let value = (row * columns) + col + 1
                  let selected = this.state.value.indexOf(value) > -1
                  return (<ButtonInput key={col} active={selected} events={{
                    mouseover: (e) => {
                      if (!this.state.done && this.state.mousedown) {
                        this.addToPattern(value)
                      }
                    },
                    mousedown: (e) => {
                      if (!this.state.done) {
                        this.addToPattern(value)
                      }
                    }
                  }} />)
                })
              }
            </div>
          ))
        }
      </div>
    )
  }
}

export {PatternInput}
