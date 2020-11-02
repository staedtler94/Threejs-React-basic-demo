// import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/app-router";

import AppNavbar from "./components/navbar/navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <AppNavbar />
        <AppRouter />
      </Router>
    );
  }
}
// function App() {}

export default App;
