import { flatten } from './utils.js'

const scale = ({ x = 1, y = 1, z = 1 }) => point => ({
  x: x * point.x,
  y: y * point.y,
  z: z * point.z
})

const translate = ({ x = 0, y = 0, z = 0 }) => point => ({
  x: x + point.x,
  y: y + point.y,
  z: z + point.z
})

const cubePoints = [
  { x: 1, y: 1, z: 1 },
  { x: -1, y: 1, z: 1 },
  { x: 1, y: -1, z: 1 },
  { x: 1, y: 1, z: -1 },
  { x: 1, y: -1, z: -1 },
  { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 },
  { x: -1, y: -1, z: -1 }
]

const crossPoints = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: -1 },
  { x: 0, y: 0, z: 1 }
]

const zero = { x: 0, y: 0, z: 0 }

const duplicate = (n, offset) => entity => {
  const off = { ...zero, ...offset }
  return flatten(Array.from(
    { length: n },
    (_, i) => {
      const trans = scale({ x: i, y: i, z: i })(off)
      return entity.map(translate(trans))
    }
  ))
}

export function cube(size = 1, center) {
  center = zero
  const s = size / 2
  return cubePoints
    .map(scale({ x: s, y: s, z: s }))
    .map(translate(center))
}

export function cross(size = 1, center) {
  center = zero
  const s = size / 2
  return crossPoints
    .map(scale({ x: s, y: s, z: s }))
    .map(translate(center))
}

export function grid(count, size, center) {
  center = [center || zero]
  const { p, q, r } = count
  const line = duplicate(p, { x: size })(center)
  const plane = duplicate(p, { y: size })(line)
  const grid = duplicate(p, { z: size })(plane)
  return grid.map(translate(center))
}