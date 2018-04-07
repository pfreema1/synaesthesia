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

class Scene extends Component {
  componentDidMount() {
    const width = CANVAS_WIDTH;
    const height = CANVAS_HEIGHT;

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

    //camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    //scene
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "yellow" });
    const cube1 = new THREE.Mesh(geometry, material);

    const geometryAlt = new THREE.BoxGeometry(2, 2, 2);
    const materialAlt = new THREE.MeshBasicMaterial({ color: "blue" });
    const cube2 = new THREE.Mesh(geometryAlt, materialAlt);

    cube2.position.set(10, 0, 20);

    camera.position.z = 4;
    scene.add(cube1);
    scene.add(cube2);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube1 = cube1;
    this.cube2 = cube2;

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
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.005;
    // this.cube1.position.x += 0.01;

    this.cube2.rotation.x += 0.3;
    this.cube2.rotation.y += 0.02;
    this.cube2.position.set(10, 0, 20);

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
