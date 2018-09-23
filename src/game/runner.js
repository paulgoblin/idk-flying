import State from './state.js'
import View from './view.js'
import Input from './input.js'
import { grid } from './builders.js'

class Runner {
  constructor(config) {
    this.config = config
    this.state = new State(config)
    this.view = new View(config)
    this.input = new Input(config)
    this.running = false
  }

  _nextFrame() { // returns time to render
    const direction = this.input.getDirection()
    const start = performance.now();
    if (direction.some(d => !!d)) {
      this.state.move(direction)
      this.view.render(this.state)
    }
    return performance.now() - start
  }

  init() {
    const n = 6
    const spacing = 7
    const offset = spacing
    this.state.add(grid({ p: n, q: n, r: n }, spacing))
    this.state.move([
      0, 0, 0,
      (-45 / 180) * Math.PI,
      (-45 / 180) * Math.PI
    ])
    this.state.move([
      -offset, 0, 0,
      (10 / 180) * Math.PI, // mysterious ... ?
      0
    ])
    this.view.init()
    this.view.render(this.state)
    this.input.listen()
  }

  start() {
    this.running = true
    function next() {
      if (!this.running) return
      const renderTime = this._nextFrame()
      setTimeout(next.bind(this), this.config.framerate - renderTime)
    }

    next.bind(this)()
  }

  stop() {
    this.running = false
  }
}

export default Runner