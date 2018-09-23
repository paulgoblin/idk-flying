let i = 1

export const uuid = () => i++

export function flatten(arr) {
  return arr.reduce((ret, val) => ret.concat(val), [])
}

export function flatMap(arr, fn) {
  return flatten(arr.map(fn))
}

export function getRandom(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

export function setStyles(el, styles) {
  let str = ''
  for (const style in styles) {
    str += (style + ':' + styles[style] + ';')
  }
  el.setAttribute('style', str)
}
