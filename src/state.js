import { uuid } from './utils.js';

const rotate = (coords, theta) => {
  const { x, y, z } = coords
  const cosz = Math.cos(theta.z)
  const sinz = Math.sin(theta.z)
  return {
    x: x * cosz - y * sinz,
    y: x * sinz + y * cosz,
    z, 
  }
}

const translate = (coords, v) => {
  const { x, y, z } = coords
  return {
    x: x + v.x,
    y: y + v.y,
    z: z + v.z,
  }
}

class Entity {
  constructor({ coords = {}, type }) {
    this.id = uuid()
    this.type = type || 'star'
    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
      z: coords.z || 0
    }
  }

  translate({ x = 0, y = 0, z = 0, tz = 0}) {
    let nextCoords = rotate(this.coords, { z: tz })
    this.coords = translate(nextCoords, { x, y, z })
  }
}

class State {
  constructor(config) {
    this.entities = [
      new Entity({ coords: { x: 3, y: 0, z: 0 }}),
      new Entity({ coords: { x: 3, y: 1, z: 0 }}),
      new Entity({ coords: { x: 3, y: -1, z: 0 }}),
      new Entity({ coords: { x: 3, y: 0, z: -1 }}),
      new Entity({ coords: { x: 3, y: 0, z: 1 }}),
      new Entity({ coords: { x: 10, y: 10, z: 2 }}),
      new Entity({ coords: { x: -10, y: 10, z: 2 }}),
      new Entity({ coords: { x: 10, y: -10, z: 2 }}),
      new Entity({ coords: { x: 10, y: 10, z: -2 }}),
      new Entity({ coords: { x: 10, y: -10, z: -2 }}),
      new Entity({ coords: { x: -10, y: -10, z: 2 }}),
      new Entity({ coords: { x: -10, y: 10, z: -2 }}),
      new Entity({ coords: { x: -10, y: -10, z: -2 }}),
    ]
    // this.entities = Array.from({ length: config.n }, () => {
    //   const { range } = config.fieldOfView
    //   return new Entity({
    //     coords: {
    //       x: Math.random() * 10 - 5,
    //       y: (Math.random() * 2 - 1),
    //       z: (Math.random() * 2 - 1)
    //     }
    //   })
    // })
  }

  move({ d = 0, t = 0 }) {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].translate({ x: -d, tz: t })
      console.log(this.entities[i].coords);
    }
  }
}


export default State