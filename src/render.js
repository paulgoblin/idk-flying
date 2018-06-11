import { Tf, Wv, Hv, Rf } from './conf.js'
import { memoize } from './utils.js'

const figures = document.getElementById('figures')

function setStyles(el, styles) {
  let str = ''
  for (const style in styles) {
    str += (style + ':' + styles[style] + ';')
  }
  el.setAttribute('style', str)
}

export function init() {
  setStyles(figures, {
    height: `${Hv}px`,
    width: `${Wv}px`,
    border: '1px solid grey',
    position: 'relative',
    overflow: 'hidden'
  })
}

const getFigure = memoize(function(id) {
  const node =  document.createElement("div");
  figures.appendChild(node)
  return {
    node,
  }
})

function draw(projection) {
  const { id, y, z, d } = projection
  const figure = getFigure(id)
  const closeness = Math.max(Rf - d, 0) / Rf
  const left = Wv * (y + 1) / 2 - 10 / 2
  const top = (Wv * (z + 1) / 2) - ((Wv - Hv) / 2) - 10 / 2
  setStyles(figure.node, {
    background: 'white',
    position: 'absolute',
    height: '10px',
    width: '10px',
    opacity: `${closeness}`,
    transform: `translate(${left}px, ${top}px)`
  })
}

function dist({ x, y, z }) {
  return Math.abs(x) + Math.abs(y) + Math.abs(z)
}

const tanTf2 = Math.tan(Tf/2)
function project(entity) {
  const { id, coords } = entity
  const { x, y, z } = coords
  return {
    id,
    y: y / (x * tanTf2),
    z: z / (x * tanTf2),
    d: dist(coords)
  }
}

export function render(game) {
  game.field
    .map(project)
    .forEach(draw)
}
