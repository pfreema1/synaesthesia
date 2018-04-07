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
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 3000);
    camera.position.z = 4;

    //scene
    const scene = new THREE.Scene();

    //light
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial({ color: "yellow" });
    const cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(0, 0, -1000);
    scene.add(cube1);

    const cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(100, 200, -1000);
    scene.add(cube2);

    //static cube
    const cube3 = new THREE.Mesh(geometry, material);
    cube3.position.set(-150, -100, -1000);
    cube3.matrixAutoUpdate = false;
    cube3.updateMatrix();
    scene.add(cube3);

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
    this.cube1.rotation.x += 0.001;
    this.cube1.rotation.y += 0.0005;

    this.cube2.rotation.x += 0.002;
    this.cube2.rotation.y += 0.0003;

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
