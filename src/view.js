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

class View {
  constructor(config, root, game) {
    this.root = root
    this.viewport = config.viewport
    this.fieldOfView = config.fieldOfView
    this.tanT2 = Math.tan(config.fieldOfView.theta / 2)
    this.game = game
    this.figures = {}
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

  getFigure(id) {
    if (this.figures[id]) {
      return this.figures[id]
    }
    const figure = this.figures[id] = {
      id,
      node: document.createElement("div")
    }
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
    const figure = this.getFigure(entity.id)
    if (entity.coords.x < 0) {
      setStyles(figure.node, { display: 'none' })
      return 
    }
    const { range } = this.fieldOfView
    const { width, height } = this.viewport
    const p = this.project(entity)
    const closeness = Math.max(range - p.d, 0) / range
    const left = width * (p.y + 1) / 2 - p.width / 2
    const top = (width * (p.z + 1) / 2) - ((width - height) / 2) - p.height / 2

    setStyles(figure.node, {
      background: p.color,
      'border-radius': '50%',
      height: `${Math.floor(p.height)}px`,
      width: `${Math.floor(p.width)}px`,
      position: 'absolute',
      'font-size': '10px',
      opacity: `${closeness}`,
      transform: `translate(${Math.floor(left)}px, ${Math.floor(top)}px)`
    })
  }

  render() {
    this.game.entities
      .forEach(this.draw.bind(this))
  }
}

export default View
