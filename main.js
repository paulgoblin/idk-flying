import State from './src/state.js'
import View from './src/view.js'
import Controller from './src/controller.js'
import config from './src/config.js'

const state = new State(config)
const view = new View(config, document.getElementById('viewport'), state)
const controller = new Controller()

view.init()
view.render()

controller.listen()

let i = 20000
function next(i) {
  if (!i) return;

  const { speed, rot } = config
  const movements = {
    'up': [ speed, 0 ],
    'down': [ -speed, 0 ],
    'left': [ 0, rot ],
    'right': [ 0, -rot ],
  }

  const inputs = controller.getInputs()

  if (inputs) {
    const direction = inputs
    .map(i => movements[i])
    .reduce(([d0, t0], [d1, t1]) => [d0 + d1, t0 + t1], [0 , 0]) // todo: use math

    const motion = {
      d: direction[0],
      t: direction[1]
    }
    state.move(motion)
    view.render()
  }

  setTimeout(() => next(--i), config.framerate)
}

next(i)

