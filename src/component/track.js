
AFRAME.registerComponent('track', {
  schema: {
    speed: {
      type: 'int',
      default: 5,
    },
  },

  tick_segment: function(segment, z_translation) {
    if (segment.object3D.position.z > 100) {
      segment.object3D.translateZ(-300);
    }
    segment.object3D.translateZ(z_translation);
  },

  tick_light: function(light, z_translation) {
    if (light.object3D.position.z > 150) {
      light.object3D.translateZ(-450);
    }
    light.object3D.translateZ(z_translation);
  },

  tick_audio_bars: function(audio_bars, z_translation) {
    if (audio_bars.object3D.position.z > 150) {
      audio_bars.object3D.translateZ(-300);
    }
    audio_bars.object3D.translateZ(z_translation / 4);
  },

  tick: function(time, timeDelta) {
    const z_translation = this.data.speed/100 * timeDelta;

    this.tick_segment(this.el.querySelector('#segment1'), z_translation);
    this.tick_segment(this.el.querySelector('#segment2'), z_translation);
    this.tick_segment(this.el.querySelector('#segment3'), z_translation);

    this.tick_light(this.el.querySelector('#light1'), z_translation);
    this.tick_light(this.el.querySelector('#light2'), z_translation);
    this.tick_light(this.el.querySelector('#light3'), z_translation);

    //this.tick_audio_bars(this.el.querySelector('#audio_bars1'), z_translation);
    //this.tick_audio_bars(this.el.querySelector('#audio_bars2'), z_translation);
    // this.tick_audio_bars(this.el.querySelector('#audio_bars3'), z_translation);
  },

  getSpeed() {
    return this.data.speed;
  },
  setSpeed(speed) {
    this.data.speed = speed;
  },
});
