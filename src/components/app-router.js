import React from "react";
import { Switch, Route } from "react-router-dom";

import TemplateArena from "./template-arena";
import JumpingCube from "./pages/jumping-cube";

// const routes = [
//   {
//     path: "/sandwiches",
//     component: Sandwiches,
//   },
//   {
//     path: "/tacos",
//     component: Tacos,
//   },
// ];

export default function RouteConfig() {
  return (
    <Switch>
      <Route exact path="/">
        <JumpingCube />
      </Route>
      <Route exact path="/visualiser">
        <TemplateArena />
      </Route>
      <Route exact path="/cube">
        <JumpingCube />
      </Route>
      <Route path="*">
        <JumpingCube />
      </Route>
    </Switch>
  );
}
