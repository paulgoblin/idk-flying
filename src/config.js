
const config = {
  n: 10,
  speed: 0.3,
  rot: 4 / 180 * Math.PI,
  viewport: {
    width: 600,
    height: 500
  },
  fieldOfView: {
    range: 50,
    theta: 110 / 180 * Math.PI
  },
  framerate: Math.floor(1000 / 60), // (ms)
}

export default config