import State from './src/state.js'
import View from './src/view.js'
import Input from './src/input.js'
import { grid } from './src/builders.js'
import config from './src/config.js'

const state = new State(config)
const view = new View(config, document.getElementById('viewport'), state)
const input = new Input(config)

const n = config.n
state.add(grid({ p: n, q: n, r: n }, 5))

view.init()
view.render()
input.listen()

function nextFrame() {
  const direction = input.getDirection()
  if (direction.some(d => !!d)) {
    state.move(direction)
    view.render()
  }
}

let i = 20000
function next(i) {
  if (!i) return;
  nextFrame()
  setTimeout(() => next(--i), config.framerate)
}

next(i)

