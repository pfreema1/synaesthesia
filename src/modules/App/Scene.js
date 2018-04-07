import React, { Component } from "react";
import * as THREE from "three";

const CANVAS_WIDTH = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
const CANVAS_HEIGHT = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);

const COLOR_PALETTE = [
  "RGBA(7, 28, 55, 1.00)",
  "RGBA(78, 63, 118, 1.00)",
  "RGBA(61, 99, 149, 1.00)",
  "RGBA(173, 216, 223, 1.00)",
  "RGBA(214, 95, 108, 1.00)",
  "RGBA(143, 60, 76, 1.00)"
];

const randomColorFromPalette = () => {
  return COLOR_PALETTE[parseInt(Math.random() * 5, 10)];
};

class Scene extends Component {
  componentDidMount() {
    // const stats;
    // this.camera, scene, raycaster, renderer;

    // const mouse = new THREE.Vector2(), INTERSECTED;
    this.radius = 500;
    this.theta = 0;
    this.frustumSize = 1000;

    const width = CANVAS_WIDTH;
    const height = CANVAS_HEIGHT;

    //renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("blue");
    this.renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    //camera
    this.aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.OrthographicCamera(
      this.frustumSize * this.aspect / -2,
      this.frustumSize * this.aspect / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      1,
      1000
    );
    this.camera.position.z = 0;

    //scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    //light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    this.scene.add(light);

    const geometry = new THREE.BoxBufferGeometry(20, 20, 20);

    for (let i = 0; i < 2000; i++) {
      let object = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      );

      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;

      this.scene.add(object);
    }

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  // this function is called over and over
  animate = () => {
    this.theta += 0.1;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div>
        <div
          style={{ border: "1px solid black" }}
          ref={mount => (this.mount = mount)}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    );
  }
}

export default Scene;
