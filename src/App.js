import React, { Component } from "react"
import "./App.css"
import { ApolloProvider } from "react-apollo"
import client from "./lib/apollo-client"
import routes from "./routes"

class App extends Component {
  render() {
    return <ApolloProvider client={client}>{routes}</ApolloProvider>
  }
}

export default App
