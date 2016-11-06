/**
 * An arrow to clear
 */
const coordinates = AFRAME.utils.coordinates;

const LINE_HEIGHT = 0.50;
const CAP_HEIGHT = 0.25;

const CAP_ROTATION = {
  DOWN: [[0, 0, 45], [0, 0, -45]],
  UP: [[0, 0, 90], [0, 0, -90]],
  RIGHT: [[0, 0, 90], [0, 0, -90]],
  LEFT: [[0, 0, 90], [0, 0, -90]],
};

const CAP_TRANSLATION = {
  DOWN: [0, -CAP_HEIGHT, 0],
  UP: [0, CAP_HEIGHT, 0],
  RIGHT: [0, LINE_HEIGHT/2, 0],
  LEFT: [0, LINE_HEIGHT/2, 0],
};

function updateRotation(geo, rotateUpdate) {
  const [x, y, z] = rotateUpdate;
  geo.rotateX(x);
  geo.rotateY(y);
  geo.rotateZ(z);
}

AFRAME.registerComponent('arrow', {
  schema: {
    direction: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
  },
  // lifecycle
  init() {
  },
  tick(time, timeDelta) {
  },

  _positionCap(direction, caps) {
    const {capMeshL,  capMeshR} = caps;
    const rotation = CAP_ROTATION[direction];
    const translation = CAP_TRANSLATION[direction];

    capMeshL.geometry.translate(0, CAP_HEIGHT/2, 0);
    updateRotation(capMeshL.geometry, rotation[0]);
    capMeshL.geometry.translate(...translation);

    capMeshR.geometry.translate(0, CAP_HEIGHT/2, 0);
    updateRotation(capMeshR.geometry, rotation[1]);
    capMeshR.geometry.translate(...translation);
  },
  _positionArrow(direction, line) {
  },

  _getArrow() {
    const entity = this.el;
    const { direction } = this.data;

	  // Set color with material.
		const material = new THREE.MeshBasicMaterial({
      color: this.data.color,
    });

    const lineMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, LINE_HEIGHT, 0));
    const capMeshL = new THREE.Mesh(new THREE.BoxGeometry(0.1, CAP_HEIGHT, 0));
    const capMeshR = new THREE.Mesh(new THREE.BoxGeometry(0.1, CAP_HEIGHT, 0));
    this._positionCap(direction, {
      capMeshL, capMeshR
    });

    const merged = new THREE.Geometry();
    merged.merge(lineMesh.geometry, lineMesh.matrix);
    merged.merge(capMeshL.geometry, capMeshL.matrix);
    merged.merge(capMeshR.geometry, capMeshR.matrix);

    const mesh = new THREE.Mesh(merged, material);

    if (direction === 'LEFT') {
      mesh.rotateZ(Math.PI/2);
    } else if (direction === 'RIGHT') {
      mesh.rotateZ(-Math.PI/2);
    }

    return mesh;
  },
  update() {
    const mesh = this._getArrow();
		this.el.setObject3D('mesh', mesh);
  },
});

console.log('injected');

