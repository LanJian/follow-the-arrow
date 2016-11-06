
const ACC_THRESHOLD = 1;

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}
function getRandomDir() {
  const num = Math.random() * 10;
  if (num < 2.5) {
	  return 'UP';
  } else if (num < 5) {
	  return 'DOWN';
  } else if (num < 7.5) {
    return 'LEFT';
  } else {
    return 'RIGHT';
  }
}

function getArrowSpawnParams() {
  return `color: ${getRandomColor()}; direction: ${getRandomDir()}`;
}

AFRAME.registerComponent('arrow-manager', {
  schema: {
    enabled: {
      type: 'bool',
      default: true,
    },
    spawnFreqMs: {
      type: 'int',
      default: 2500,
    }
  },
  // lifecycle
  init() {
    this._lastTime = null;
    this._arrows = [];

    // register motion detector
    this._deviceMotion = FULLTILT.getDeviceMotion();

    this._deviceMotion.then(motionData => {
      motionData.listen(() => {
        // Display calculated screen-adjusted devicemotion
        const screenAcc = motionData.getScreenAdjustedAcceleration() || {};
        const screenAccG = motionData.getScreenAdjustedAccelerationIncludingGravity() || {};
        const screenRotRate = motionData.getScreenAdjustedRotationRate() || {};

        console.info('ScreenAcc.X::', screenAcc.x);
        console.info('ScreenAcc.Y::', screenAcc.y);
        console.info('ScreenAcc.Z::', screenAcc.z);

        console.info('ScreenAccG.X::', screenAccG.x);
        console.info('ScreenAccG.Y::', screenAccG.y);
        console.info('ScreenAccG.Z::', screenAccG.z);
      });
    });
  },

  _spawnArrow() {
    const entity = document.createElement('a-entity');

    this._arrows.push(entity);

    const idCounter = this._arrows.length;

    entity.setAttribute('arrow', getArrowSpawnParams());
    entity.setAttribute('id', `entity-${idCounter}`);

    this.el.appendChild(entity);
  },
  tick(time, timeDelta) {
    if (!this._lastTime) {
      this._lastTime = time;
    }
    if (this.data.enabled && (time - this._lastTime) > this.data.spawnFreqMs) {
      console.info('Generating arrow');
      this._lastTime = time;
      this._spawnArrow();
    }
  },
});
