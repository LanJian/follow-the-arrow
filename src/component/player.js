AFRAME.registerComponent('player', {
  dependencies: ['raycaster'],
  init() {
  },
  tick(time, timeDelta) {
    // fix the camera position at every frame
    this.el.object3D.position.set(0, 1.7, 5);
  },
});
