import { uuid } from './utils.js';

const rotate = (coords, theta) => {
  const { x, y, z } = coords
  const cosz = Math.cos(theta.z)
  const sinz = Math.sin(theta.z)
  const cosy = Math.cos(theta.y)
  const siny = Math.sin(theta.y)
  const A = {
    x: x * cosz - y * sinz,
    y: x * sinz + y * cosz,
    z, 
  }
  return {
    x: A.x * cosy + A.z * siny,
    y: A.y,
    z: -A.x * siny + A.z * cosy
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

  translate([ tx, ty, ry, rz ]) {
    let nextCoords = rotate(this.coords, { y: -ry, z: rz })
    this.coords = translate(nextCoords, { x: -tx, y: ty, z: 0 })
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
  }

  move(direction) {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].translate(direction)
    }
  }
}


export default State