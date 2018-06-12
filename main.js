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

const sumVect = (v1, v2) => v1.map((el, i) => el + v2[i])

let i = 20000
function next(i) {
  if (!i) return;

  const { speed, rot } = config
  const movements = {
    'strafeL': [ 0, speed, 0, 0 ],
    'forward': [ speed, 0, 0, 0 ],
    'strafeR': [ 0, -speed, 0, 0 ],
    'backward': [ -speed, 0, 0, 0 ],
    'turnL': [ 0, 0, 0, rot ],
    'turnU': [ 0, 0, rot, 0 ],
    'turnR': [ 0, 0, 0, -rot ],
    'turnD': [ 0, 0, -rot, 0 ],
  }

  const inputs = controller.getInputs()

  if (inputs.length) {
    const direction = inputs
      .map(i => movements[i])
      .reduce(sumVect, [0, 0, 0, 0])

    state.move(direction)
    view.render()
  }

  setTimeout(() => next(--i), config.framerate)
}

next(i)

