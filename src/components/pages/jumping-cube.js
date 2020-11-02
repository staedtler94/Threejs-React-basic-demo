import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import RangeSlider from "react-bootstrap-range-slider";

class JumpingCube extends Component {
  state = {
    stifness: 2,
    force: 50,
    damping: 0.1,
    time: 0,
    steadyState: false,
  };

  componentDidMount() {
    // console.log(this.mount);
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = -20;
    this.camera.position.x = 50;
    this.camera.position.y = 30;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(new THREE.Color(0xffffff));
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    const grid = new THREE.GridHelper(150, 150, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    grid.position.x = 0;
    grid.position.y = 0;
    grid.position.z = 0;
    this.scene.add(grid);

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);

    //ADD CUBE
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = 10;
    this.cube.position.y = 10;
    this.cube.position.z = 0;
    this.scene.add(this.cube);

    this.clock = new THREE.Clock();
    this.prevTransY = -99999;

    this.counterSteadyState = 0;
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

  animate = () => {
    // const transY = Math.sin(this.time) * 10 + 15;

    if (!this.state.steadyState) {
      var input = "Spring-Damper";
      var transY = this.equationSolverY(input);
      this.cube.position.y = transY;
      this.updateSolutionStatus(transY);
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  checkResize() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const prevWidth = this.camera.width;
    const prevHeight = this.camera.height;

    const needResize = prevWidth !== width || prevHeight !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    return needResize;
  }

  renderScene = () => {
    this.checkResize();
    this.renderer.render(this.scene, this.camera);
  };

  // for negligible displacement the steady state is said to be reached
  // cuts of the computation intense solver and only displays cube on the last Y coordinate
  updateSolutionStatus(currTransY) {
    if (Math.abs(currTransY - this.prevTransY) < 0.2) {
      if (this.counterSteadyState > 50) {
        this.setSteadyState(true);
      }
      this.counterSteadyState += 1;
      console.log(this.counterSteadyState);
    } else {
      this.prevTransY = currTransY;
      this.counterSteadyState = 0;
    }
  }

  equationSolverY(input) {
    var transY = 0;
    this.setTime(this.state.time + this.clock.getDelta());

    // Should be independent utils to solve Spring Oscillation equations
    // Based on the equation for Spring Oscillation notes Purdue.
    // https://engineering.purdue.edu/~ce597m/Handouts/Heaton_SDOF_ch1.pdf
    if (input === "Spring-Damper") {
      this.omega1 = Math.sqrt(
        this.state.stifness * this.state.stifness -
          this.state.damping * this.state.damping
      );
      var firstEl =
        Math.exp(-this.state.damping * this.state.time) *
        Math.cos(this.omega1 * this.state.time);

      var secondEL =
        (this.state.damping *
          Math.exp(-this.state.damping * this.state.time) *
          Math.sin(this.omega1 * this.state.time)) /
        this.omega1;

      transY =
        (this.state.force * (1 - firstEl - secondEL)) /
        (this.state.stifness * this.state.stifness);
      console.log(transY);
    }

    return transY;
  }

  setStifness = (e) => this.setState({ stifness: e.target.value });
  setForce = (e) => this.setState({ force: e.target.value });
  setDamping = (e) => this.setState({ damping: e.target.value });
  setTime = (e) => this.setState({ time: e });
  setSteadyState = (e) => this.setState({ steadyState: e });

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
            <h1>Spring Damper Oscilating Cube</h1>
            <p>
              This example showcases how solving differnt equations can lead to
              different displacement patterns.
            </p>
            <Form>
              <Form.Group controlId="formBasicRange">
                <Form.Label>Force: {this.state.force} </Form.Label>
                <Form.Control
                  type="range"
                  value={this.state.force}
                  min={1}
                  max={100}
                  onChange={this.setForce}
                />
                <Form.Label>Stifness: {this.state.stifness} </Form.Label>
                <Form.Control
                  type="range"
                  value={this.state.stifness}
                  min={1}
                  max={10}
                  onChange={this.setStifness}
                />
                <Form.Label>Damping: {this.state.damping} </Form.Label>
                <Form.Control
                  type="range"
                  value={this.state.damping}
                  min={0.1}
                  max={1}
                  step={0.05}
                  onChange={this.setDamping}
                />
                <div>
                  <Form.Label>Time:{this.state.time.toFixed(3)} </Form.Label>
                </div>
                <div>
                  <Form.Label>
                    Steady State: {this.state.steadyState.toString()}
                  </Form.Label>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JumpingCube;
