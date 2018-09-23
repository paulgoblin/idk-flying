import Runner from './src/game/runner.js'
import config from './src/config.js'

const runner = new Runner(
  config(document.getElementById('root'))
)

runner.init()
runner.start()
