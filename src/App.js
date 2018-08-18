import React, { Component } from "react";
import "./App.css";
import { ApolloProvider, Query } from "react-apollo";
import client from "./lib/apollo-client";
import gql from "graphql-tag";

const query = gql`
  {
    flow {
      id
      games {
        id
        title
        cover {
          url
          width
          height
        }
      }
      participants {
        id
        score
        rank
        ratings {
          value
          comment {
            content
          }
          previous {
            value
          }
        }
        person {
          id
          name
          isFollowedByMe
          avatar {
            url
          }
        }
      }
      images {
        url
      }
      location {
        name
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={query}>
          {({ data, loading, error }) => {
            if (loading) return "Loading…";
            if (error) return "Error!";

            return (
              <div className="container mx-auto max-w-sm">
                {data.flow.map(({ participants, games, images }) => (
                  <div>
                    <div className="flex">
                      <div className="">
                        {participants.map(({ person }) => (
                          <img
                            className="rounded-full"
                            src={person.avatar.url}
                            alt=""
                            width="50"
                          />
                        ))}
                      </div>
                      <div>{participants.map(({ person }) => person.name)}</div>
                    </div>
                    <div>
                      <div>
                        {images
                          .slice(0, 1)
                          .map(({ url }) => (
                            <img src={url} alt="" className="w-full" />
                          ))}
                      </div>
                      <div>Played {games[0].title}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
