let i = 1

export const uuid = () => i++

export function memoize(fn) {
  const cache = new Map()
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg)
    cache.set(arg, fn(arg))
    return cache.get(arg)
  }
}

export function flatten(arr) {
  return arr.reduce((ret, val) => ret.concat(val), [])
}

export function flatMap(arr, fn) {
  return flatten(arr.map(fn))
}
