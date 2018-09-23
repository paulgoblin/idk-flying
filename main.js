import Runner from './src/game/runner.js'
import ControlsMenu from './src/controls-menu.js'
import config from './src/config.js'

const runner = new Runner(
  config(document.getElementById('root'))
)

const controlsMenu = new ControlsMenu({
  id: 'controls-menu',
})
controlsMenu.open()

runner.init()
runner.start()

