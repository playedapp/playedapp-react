import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://playedapp-mock.glitch.me",
  connectToDevTools: true
});

export default client;
