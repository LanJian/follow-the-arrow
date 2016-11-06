const ACC_THRESHOLD = 3;
const TIMEOUT_MS = 1.5e3;

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
        //const screenAccG = motionData.getScreenAdjustedAccelerationIncludingGravity() || {};
        const moved = {};


        if (screenAcc.x > ACC_THRESHOLD) {
          moved.right = true;
        } else if (screenAcc.x < -ACC_THRESHOLD) {
          moved.left = true;
        }

        if (screenAcc.y > ACC_THRESHOLD) {
          moved.up  = true;
        } else if (screenAcc.y < -ACC_THRESHOLD) {
          moved.down = true;
        }

        if (screenAcc.z > ACC_THRESHOLD) {
          moved.backward = true;
        } else if (screenAcc.z < -ACC_THRESHOLD) {
          moved.forward = true;
        }

        const currentArrow = this._arrows[0];
        if (!currentArrow || !currentArrow.components || !currentArrow.components.arrow) {
          return;
        }

        const direction = currentArrow.components.arrow.getDirection();

        if (Object.keys(moved).length) {
          console.info('Acceleration::', screenAcc);
          console.info('Moved::', moved);
          console.info('Arrow::', direction);
        }

        if (moved.up && direction === 'UP' ||
            moved.down && direction === 'DOWN' ||
            moved.left && direction === 'LEFT' ||
            moved.right && direction === 'RIGHT'
        ) {
          
          this._sleeping = true;
          setTimeout(() => {
            this._sleeping = false;
          }, TIMEOUT_MS);

          currentArrow.components.arrow.clear();
          this._arrows.pop();

          // after clearing 1 arrow, increase speed
          const elems = this.el.sceneEl.getElementsByClassName('track');

          if (elems.track) {
            elems.track.components.track.setSpeed(
              elems.track.components.track.getSpeed() * 1.03
            );
          }
        }
      });
    });
  },

  _spawnArrow() {
    if (this._arrows.length || this._sleeping) {
      return;
    }

    const entity = document.createElement('a-entity');
    this._arrows.push(entity);

    const idCounter = this._arrows.length;
    entity.classList.add('arrow');
    entity.setAttribute('arrow', getArrowSpawnParams());
    entity.setAttribute('id', `arrow-${idCounter}`);

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
