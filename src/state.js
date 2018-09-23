import { uuid, memoize } from './utils.js';

const cos = memoize(Math.cos)
const sin = memoize(Math.sin)

function move(start, trans, theta) {
  const { x, y, z } = start
  const cosz = cos(theta.z)
  const sinz = sin(theta.z)
  const cosy = cos(-theta.y)
  const siny = sin(-theta.y)
  const ax = x * cosz - y * sinz

  this.coords.x = ax * cosy + z * siny - trans.x;
  this.coords.y = x * sinz + y * cosz + trans.y;
  this.coords.z = -ax * siny + z * cosy + trans.z;
}

class Point {
  constructor({ coords = {}, type }) {
    this.id = uuid()
    this.move = move.bind(this)
    this.type = type || 'dot'
    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
      z: coords.z || 0
    }
  }
}

class State {
  constructor(config) {
    this.points = []
  }

  add(manyCoordinates) {
    this.points = manyCoordinates
      .map(coords => new Point({ coords }))
      .concat(this.points)
  }

  move(direction) {
    const [ tx, ty, tz, ry, rz ] = direction
    const trans = { x: tx, y: ty, z: tz }
    const rot = { y: ry, z: rz }
    for (const point of this.points) {
      point.move(point.coords, trans, rot )
    }
  }
}

export default State