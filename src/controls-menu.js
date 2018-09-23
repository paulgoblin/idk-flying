import { getRandom, setStyles } from './utils.js'
import { keyMap } from './game/input.js'

const colors = [
    'plum',
    'tomato',
    'teal',
    'steelblue',
    'skyblue',
    'salmon',
    'orange',
    'darkseagreen',
    'lightcoral',
    'cadetblue',
]

class ControlsMenu {
    constructor(config) {
        this.config = config;
        this.node = document.getElementById(config.id)
        this.node.addEventListener('click', this.close.bind(this))
        document.addEventListener('keydown', this.closeOnKeyPress.bind(this))
        this.isOpen = false;
    }

    open() {
        setStyles(this.node, {
            visibility: 'visible',
            background: getRandom(colors)
        })
        this.isOpen = true;
    }

    close() {
        setStyles(this.node, {
            visibility: 'hidden'
        })
        this.isOpen = false;
        this.config.onClose()
    }

    closeOnKeyPress({ key }) {
        if (this.isOpen && keyMap[key]) {
            this.close()
        }
    }
}

export default ControlsMenu