AFRAME.registerComponent('collider-check', {
  schema: { type: 'string' },
  init() {
    this.el.addEventListener('raycaster-intersected', evt => {
      if (evt.detail && evt.detail.el !== evt.detail.target && evt.detail.intersection.distance < 0.1) {
        const elems = evt.detail.target.sceneEl.getElementsByClassName('track');
        debugger;
        if (elems.track) {
          // GAME OVER
          elems.track.components.track.setSpeed(0);
        }
      }
    });
  }
});
