import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class AppNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Examples" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/cube">
              Jumping Cube
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/visualiser">
              Visualisation
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default AppNavbar;
