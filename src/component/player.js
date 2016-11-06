AFRAME.registerComponent('player', {
  dependencies: ['raycaster'],
  init() {
    this.el.addEventListener('raycaster-intersection', (evt) => {
    });
  }
});
