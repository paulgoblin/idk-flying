import State from './src/state.js'
import View from './src/view.js'
import config from './src/config.js'

const state = new State(config)
console.log(state.entities);
const view = new View(config, document.getElementById('viewport'), state)
view.init()
view.render()

const keyMap = {
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down',
}
class Input {
  constructor() {
    this.keys = []
  }

  getMovement() {
    return this.keys[0]
  }

  listen() {
    document.onkeyup = this.handleKeyUp.bind(this)
    document.onkeydown = this.handleKeyDown.bind(this)
  }

  setDirection(direction, val) {
    if (!direction) return
    const i = this.keys.indexOf(direction)
    if (val && i === -1) {
      this.keys = [
        direction,
        ...this.keys
      ]
    } else if (!val && i > -1){
      this.keys = [
        ...this.keys.slice(0, i),
        ...this.keys.slice(i + 1),
      ]
    }
  }

  handleKeyDown({ keyCode }) {
    this.setDirection(keyMap[keyCode], true)
  }

  handleKeyUp({ keyCode }) {
    this.setDirection(keyMap[keyCode], false)
  }
}

const input = new Input()
input.listen()

let i = 20000
function next(i) {
  if (!i) return;
  let moved = true;

  switch (input.getMovement()) {
    case 'up':
      state.move({ d: config.speed })
      break
    case 'down':
      state.move({ d: -config.speed })
      break
    case 'left':
      state.move({ t: config.rot })
      break
    case 'right':
      state.move({ t: -config.rot })
      break
    default:
      moved = false
      break
  }

  if (moved) {
    view.render()
  }
  setTimeout(() => next(--i), config.framerate)
}

next(i)

