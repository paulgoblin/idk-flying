function config(root) {
  const viewport = {
    width: root.clientWidth,
    height: root.clientHeight
  }

  const fieldOfView= {
    range: 100,
    tanTheta: (viewport.width / 1200) * Math.tan( (120 / 2) / 180 * Math.PI)
  }

  return {
    n: 6,
    speed: 0.2,
    rot: 2 / 180 * Math.PI,
    framerate: Math.floor(1000 / 60), // 60 fps
    root,
    viewport,
    fieldOfView,
  }
}

export default config