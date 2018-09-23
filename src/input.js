const keyMap = {
  '65': 'strafeL',
  '87': 'forward',
  '68': 'strafeR',
  '83': 'backward',
  '90': 'strafeU',
  '67': 'strafeD',
  '37': 'turnL',
  '38': 'turnU',
  '39': 'turnR',
  '40': 'turnD',
  '38': 'turnU',
}

const movements = {
  'strafeL': [ 0, 1, 0, 0, 0 ],
  'forward': [ 1, 0, 0, 0, 0 ],
  'strafeR': [ 0, -1, 0, 0, 0 ],
  'backward': [ -1, 0, 0, 0, 0 ],
  'strafeU': [ 0, 0, 1, 0, 0 ],
  'strafeD': [ 0, 0, -1, 0, 0 ],
  'turnL': [ 0, 0, 0, 0, 1 ],
  'turnU': [ 0, 0, 0, 1, 0 ],
  'turnR': [ 0, 0, 0, 0, -1 ],
  'turnD': [ 0, 0, 0, -1, 0 ],
}

const zero = [0, 0, 0, 0, 0]

const sumVect = (v1, v2) => v1.map((el, i) => el + v2[i])
const multVectValues = v1 => v2 => v1.map((el, i) => el * v2[i])

class Input {
  constructor(config) {
    const { speed, rot } = config
    this.keys = []
    this.multiplier = [speed, speed, speed, rot, rot]
  }

  getDirection() {
    return this.getInputs()
      .map(i => movements[i])
      .map(multVectValues(this.multiplier))
      .reduce(sumVect, zero)
  }

  getInputs() {
    return this.keys.slice(0,2)
  }

  listen() {
    document.onkeyup = this.handleKeyUp.bind(this)
    document.onkeydown = this.handleKeyDown.bind(this)
  }

  setInputs(direction, val) {
    if (!direction) return
    const i = this.keys.indexOf(direction)
    if (val && i === -1) {
      this.keys = [
        direction,
        ...this.keys
      ]
    } else if (!val && i > -1){
      this.keys = [
        ...this.keys.slice(0, i),
        ...this.keys.slice(i + 1),
      ]
    }
  }

  handleKeyDown({ keyCode }) {
    console.log('KEYCODE', keyCode);
    this.setInputs(keyMap[keyCode], true)
  }

  handleKeyUp({ keyCode }) {
    this.setInputs(keyMap[keyCode], false)
  }
}

export default Input