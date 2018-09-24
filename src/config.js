function config(root) {
  const viewport = {
    width: root.clientWidth,
    height: root.clientHeight
  }

  const fieldOfView= {
    range: 120,
    // 120  degree field of view at 1200px screen width
    tanTheta: (viewport.width / 1200) * Math.tan( (120 / 2) / 180 * Math.PI)
  }

  return {
    speed: 0.5,
    rot: 2 / 180 * Math.PI,
    framerate: Math.floor(1000 / 60), // 60 fps
    root,
    viewport,
    fieldOfView,
  }
}

export default config