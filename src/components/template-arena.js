import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class TemplateArena extends Component {
  componentDidMount() {
    // console.log(this.mount);
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = -4;
    this.camera.position.y = 50;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(new THREE.Color(0x87cefa));
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setRGB(0.5, 0.5, 0.5),
      side: THREE.DoubleSide,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = 10;
    this.cube.position.y = 10;
    this.cube.position.z = 0;
    this.scene.add(this.cube);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.currentIntersected = null;

    this.clickSelection();
    this.start();
  }

  clickSelection() {
    window.addEventListener(
      "mousemove",
      function (event) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // calculate objects intersecting the picking ray

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
          if (this.currentIntersected != intersects[0].object) {
            if (this.currentIntersected)
              this.currentIntersected.material.color.setHex(
                this.currentIntersected.currentHex
              );

            this.currentIntersected = intersects[0].object;
            this.currentIntersected.currentHex = this.currentIntersected.material.color.getHex();
            this.currentIntersected.material.color.setHex(0xff0000);
          }
        } else {
          if (this.currentIntersected)
            this.currentIntersected.material.color.setHex(
              this.currentIntersected.currentHex
            );
          this.currentIntersected = null;
        }
      }.bind(this)
    );
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener(
      "mousemove",
      function (event) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }.bind(this)
    );
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  addComponents() {
    var size = (Math.floor(Math.random() * Math.floor(5)) > 0) + 1;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setRGB(
        Math.random(),
        Math.random(),
        Math.random()
      ),
      side: THREE.DoubleSide,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = Math.floor(Math.random() * Math.floor(30));
    this.cube.position.y = Math.floor(Math.random() * Math.floor(30));
    this.cube.position.z = Math.floor(Math.random() * Math.floor(30));
    this.scene.add(this.cube);
    this.controls.update();
  }

  render() {
    return (
      <Container fluid>
        <Row style={{ marginTop: "2%" }}>
          <Col xl={9} lg={9} md={12} sm={12}>
            <div
              style={{ width: "auto", height: "500px" }}
              ref={(mount) => {
                this.mount = mount;
              }}
            />
          </Col>
          <Col xl={3} lg={3} md={9} sm={12}>
            <div className="page-header">
              <h1>Component Visualiser</h1>
              <p>
                This example dynamically adds componets to visual various
                aspects of the Geometry. It picks different entities to log
                details to better understand models.
              </p>
              <Button variant="primary" onClick={this.addComponents.bind(this)}>
                Add Components
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TemplateArena;
