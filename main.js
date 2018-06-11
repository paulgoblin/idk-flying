import { makeGame } from './src/game.js'
import { framerate } from './src/conf.js'
import { init, render } from './src/render.js'

init()
const game = makeGame()
render(game)

let i = 5000
function moveForward(i) {
  if (!i) return;
  game.moveForward(1)
  render(game)
  setTimeout(() => moveForward(--i), framerate)
}

moveForward(i)

console.log('GAME', game);
