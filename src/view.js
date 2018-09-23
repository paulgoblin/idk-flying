import entityTypes from './entity-types.js'

function setStyles(el, styles) {
  let str = ''
  for (const style in styles) {
    str += (style + ':' + styles[style] + ';')
  }
  el.setAttribute('style', str)
}

function dist({ x, y, z }) {
  return Math.abs(x) + Math.abs(y) + Math.abs(z)
}

class Figure {
  constructor(config) {
    this.id = config.id
    this.node = document.createElement("div")
    this.node.setAttribute('class', config.type)
    this.isShown = config.isShown
  }

  show(doShow = true) {
    if (!doShow && this.isShown) {
      this.isShown = false;
      this.node.setAttribute('style', 'display: none;')
    }
  }
}

class View {
  constructor(config, root, game) {
    this.root = root
    this.viewport = config.viewport
    this.fieldOfView = config.fieldOfView
    this.tanT2 = Math.tan(config.fieldOfView.theta / 2)
    this.game = game
    this.figures = {}
    this.draw = this.draw.bind(this)
  }

  init() {
    setStyles(this.root, {
      height: `${this.viewport.height}px`,
      width: `${this.viewport.width}px`,
      border: '1px solid grey',
      overflow: 'hidden',
      position: 'relative'
    })
  }

  getFigure(entity) {
    const { id, type } = entity
    if (this.figures[id]) {
      return this.figures[id]
    }
    const figure = this.figures[id] = new Figure(entity)
    this.root.appendChild(figure.node)
    return figure
  }

  project(entity) {
    const { coords, type } = entity
    const { size, color } = entityTypes[type]
    const { x, y, z } = coords
    const scale = (x * this.tanT2)

    return {
      y: y / scale,
      z: z / scale,
      width: size / scale, // size * scale,
      height: size / scale, // size * scale,
      d: dist(coords),
      color,
    }
  }

  draw(entity) {
    const figure = this.getFigure(entity)
    if (entity.coords.x < 0) {
      figure.show(false)
      return
    }
    const { range } = this.fieldOfView
    const { width, height } = this.viewport
    const p = this.project(entity)
    if (p.d > range) {
      figure.show(false)
      return
    }
    const closeness = Math.max(range - p.d, 0) / range
    const left = width * (p.y + 1) / 2 - p.width / 2
    const top = (width * (p.z + 1) / 2) - ((width - height) / 2) - p.height / 2
    const colorAmt = Math.floor(255 * closeness).toString(16)

    setStyles(figure.node, {
      background: '#' + colorAmt + colorAmt + colorAmt,
      height: `${Math.floor(p.height)}px`,
      width: `${Math.floor(p.width)}px`,
      'z-index': -Math.floor(p.d),
      transform: `translate(${Math.floor(left)}px, ${Math.floor(top)}px)`
    })
  }

  render() {
    for (const point of this.game.points) {
      this.draw(point)
    }
  }
}

export default View
