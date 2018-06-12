const keyMap = {
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down',
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
    console.log('ok');
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
    this.setDirection(keyMap[keyCode], true)
  }

  handleKeyUp({ keyCode }) {
    this.setDirection(keyMap[keyCode], false)
  }
}

export default Input