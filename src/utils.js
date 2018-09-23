let i = 1

export const uuid = () => i++

export function flatten(arr) {
  return arr.reduce((ret, val) => ret.concat(val), [])
}

export function flatMap(arr, fn) {
  return flatten(arr.map(fn))
}
