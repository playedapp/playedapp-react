import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Switch, Route } from "react-router"
import FlowScreen from "./screens/Flow/FlowScreen"
import SessionScreen from "./screens/Session/SessionScreen"

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={FlowScreen} />
      <Route exact path="/sessions/:id" component={SessionScreen} />
    </Switch>
  </BrowserRouter>
)
