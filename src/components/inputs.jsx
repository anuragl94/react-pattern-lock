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
        // First figure out whether any other dots fall exactly on the line
        // between the last and latest input & add them to the pattern as well
        if (this.state.value.length) {
          let lastVal = this.state.value.slice(-1)[0]
          let x1 = lastVal % this.props.rows
          let y1 = parseInt(lastVal / this.props.rows)
          let x2 = value % this.props.rows
          let y2 = parseInt(value / this.props.rows)
          let xdir = Math.sign(x2 - x1)
          let ydir = Math.sign(y2 - y1)
          let iterations = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1))
          if (!xdir || !ydir || Math.abs(x2 - x1) === Math.abs(y2 - y1)) {
            for (let i = 1; i < iterations; i++) {
              let intermediateValue = (i * xdir + x1) + (i * ydir + y1) * this.props.rows
              newState.value.push(intermediateValue)
            }
          }
        }
        newState.value.push(value)
      }
      return newState
    })
  }
  clearPattern () {
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
                  let value = (row * columns) + col
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
