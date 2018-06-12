const keyMap = {
  '65': 'strafeL',
  '87': 'forward',
  '68': 'strafeR',
  '83': 'backward',
  '37': 'turnL',
  '38': 'turnU',
  '39': 'turnR',
  '40': 'turnD',
}

class Input {
  constructor() {
    this.keys = []
  }

  getInputs() {
    return this.keys.slice(0,2)
  }

  listen() {
    document.onkeyup = this.handleKeyUp.bind(this)
    document.onkeydown = this.handleKeyDown.bind(this)
  }

  setDirection(direction, val) {
    // console.log(direction);
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
    console.log(keyCode);
    this.setDirection(keyMap[keyCode], true)
  }

  handleKeyUp({ keyCode }) {
    this.setDirection(keyMap[keyCode], false)
  }
}

export default Input