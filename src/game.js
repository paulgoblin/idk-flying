import { n } from './conf.js'
import { uuid } from './utils.js';

function makeRandom() {
  return new Entity({
    x: Math.random() * 10 + 40,
    y: (Math.random() * 2 - 1),
    z: (Math.random() * 2 - 1)
  })
}

function Entity({ x, y, z } = {}) {
  console.log('x', x);
  function translate({ x = 0, y = 0, z = 0 }) {
    this.coords = {
      x: this.coords.x + x,
      y: this.coords.y + y,
      z: this.coords.z + z
    }
  }
  return {
    id: uuid(),
    coords: {
      x,
      y,
      z,
    },
    translate
  }
}

function makeGame() {
  return {
    field: Array.from({ length: n }, () => makeRandom()),
    // field: [
    //   new Entity({ x: 50, y: -1, z: -1 }),
    //   new Entity({ x: 50, y: 0, z: -1 }),
    //   new Entity({ x: 50, y: 1, z: -1 }),
    //   new Entity({ x: 50, y: -1, z: 0 }),
    //   new Entity({ x: 50, y: 0, z: 0 }),
    //   new Entity({ x: 50, y: 1, z: 0 }),
    //   new Entity({ x: 50, y: 1, z: 1 }),
    //   new Entity({ x: 50, y: -1, z: 1 }),
    //   new Entity({ x: 50, y: 0, z: 1 }),
    // ],
    moveForward: function(dist) {
      this.field.forEach(e => e.translate({ x: -dist }))
    }
  }
}

export { 
  makeGame
}