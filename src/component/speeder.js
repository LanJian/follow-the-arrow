AFRAME.registerComponent('speeder', {
  schema: { type: 'int', default: 5 },
  tick(time, timeDelta) {
    const z = (this.data / 100) * timeDelta;
    this.el.object3D.translateZ(z);
  },
});
