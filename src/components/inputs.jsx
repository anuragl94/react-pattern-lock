import React, {Component} from 'react'

const ButtonInput = function ({active, events: {mouseover, mousedown}}) {
  return (
    <div className={'pattern-button' + (active ? ' active' : '')}
      onMouseOver={mouseover}
      onMouseDown={mousedown}
     />
  )
}

class PatternInput extends Component {
  constructor (props, {store}) {
    super(props)
    this.state = {
      value: [],
      mousedown: false
    }
    this.valueToCoords = this.valueToCoords.bind(this)
    this.mouseUpEventHandler = this.mouseUpEventHandler.bind(this)
  }
  addToPattern (value) {
    this.setState(function (prevState) {
      let newState = Object.assign({}, prevState)
      if (newState.value.indexOf(value) === -1) {
        // First figure out whether any other dots fall exactly on the line
        // between the last and latest input & add them to the pattern as well
        if (this.state.value.length) {
          let lastVal = this.state.value.slice(-1)[0]
          let coords1 = this.valueToCoords(lastVal)
          let coords2 = this.valueToCoords(value)
          let xdir = Math.sign(coords2.x - coords1.x)
          let ydir = Math.sign(coords2.y - coords1.y)
          let iterations = Math.max(Math.abs(coords2.x - coords1.x), Math.abs(coords2.y - coords1.y))
          if (!xdir || !ydir || Math.abs(coords2.x - coords1.x) === Math.abs(coords2.y - coords1.y)) {
            for (let i = 1; i < iterations; i++) {
              let intermediateValue = (i * xdir + coords1.x) + (i * ydir + coords1.y) * this.props.rows
              if (newState.value.indexOf(intermediateValue) === -1) {
                newState.value.push(intermediateValue)
              }
            }
          }
        }
        newState.value.push(value)
      }
      return newState
    })
  }
  valueToCoords (value) {
    return {
      x: value % this.props.rows,
      y: parseInt(value / this.props.rows)
    }
  }
  clearPattern () {
    this.setState({
      value: []
    })
  }
  mouseUpEventHandler (e) {
    let stateUpdates = {
      mousedown: false
    }
    let pattern = this.state.value.slice(0)
    stateUpdates.value = []
    this.setState(stateUpdates)
    if (pattern.length >= 1) {
      this.props.events.change(pattern)
    }
  }
  componentDidMount () {
    document.addEventListener('mouseup', this.mouseUpEventHandler)
  }
  componentWillUnmount () {
    document.removeEventListener('mouseup', this.mouseUpEventHandler)
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
