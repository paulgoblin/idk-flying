let i = 1

export const uuid = () => i++

export function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const val = Map[args] || fn(...args)
    if (!Map[args]) {
      Map[args] =  val
    }
    return val
  }
}
