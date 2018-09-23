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

  _nextFrame() {
    const direction = this.input.getDirection()
    if (direction.some(d => !!d)) {
      this.state.move(direction)
      this.view.render(this.state)
    }
  }

  init() {
    const n = this.config.n
    const spacing = 5
    this.state.add(grid({ p: n, q: n, r: n }, spacing))
    this.view.init()
    this.view.render(this.state)
    this.input.listen()
  }

  start() {
    this.running = true

    function next() {
      if (!this.running) return
      this._nextFrame()
      setTimeout(next.bind(this), this.config.framerate)
    }

    next.bind(this)()
  }

  stop() {
    this.running = false
  }
}

export default Runner