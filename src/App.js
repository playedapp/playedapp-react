import React, { Component } from "react";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import client from "./lib/apollo-client";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import FlowScreen from "./screens/Flow/FlowScreen";
import SessionScreen from "./screens/Session/SessionScreen";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={FlowScreen} />
            <Route exact path="/session/:id" component={SessionScreen} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
