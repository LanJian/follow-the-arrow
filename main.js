AFRAME.registerComponent('track', {
  schema: { type: "string" },

  tick_segment: function(segment, z_translation) {
    if (segment.object3D.position.z > 100) {
      segment.object3D.position.set(
        segment.object3D.position.x,
        segment.object3D.position.y,
        segment.object3D.position.z - 300
      );
    }
    segment.object3D.position.set(
      segment.object3D.position.x,
      segment.object3D.position.y,
      segment.object3D.position.z + z_translation
    );
  },

  tick_light: function(light, z_translation) {
    if (light.object3D.position.z > 150) {
      light.object3D.position.set(
        light.object3D.position.x,
        light.object3D.position.y,
        light.object3D.position.z - 450
      );
    }
    light.object3D.position.set(
      light.object3D.position.x,
      light.object3D.position.y,
      light.object3D.position.z + z_translation
    );
  },

  tick: function(time, timeDelta) {
    var z_translation = 0.05 * timeDelta;

    this.tick_segment(this.el.querySelector('#segment1'), z_translation);
    this.tick_segment(this.el.querySelector('#segment2'), z_translation);
    this.tick_segment(this.el.querySelector('#segment3'), z_translation);

    this.tick_light(this.el.querySelector('#light1'), z_translation);
    this.tick_light(this.el.querySelector('#light2'), z_translation);
    this.tick_light(this.el.querySelector('#light3'), z_translation);
  },
});
