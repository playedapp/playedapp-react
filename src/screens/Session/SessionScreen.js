import React, { Component } from "react"
import { Query } from "react-apollo"
import Spinner from "../../components/Spinner"
import sessionQuery from "../../queries/session"
import Tabs from "../../components/Tabs"
import SessionDetailsScreen from "./screens/DetailsScreen"
import ScoreboardScreen from "./screens/ScoreboardScreen"
import RatingsScreen from "./screens/RatingsScreen"
import context from "./context"
import ErrorScreen from "../Error/ErrorScreen"

export default class Session extends Component {
  render() {
    return (
      <Query
        query={sessionQuery}
        variables={{ id: this.props.match.params.id }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Spinner />
          if (error) return <ErrorScreen />

          const {
            session: { images },
          } = data

          return (
            <context.Provider value={data}>
              <div>
                {images.slice(0, 1).map(({ url }) => (
                  <img key={url} src={url} alt="" className="w-full block" />
                ))}
                <Tabs
                  screens={[
                    { title: "Session", component: SessionDetailsScreen },
                    { title: "Scoreboard", component: ScoreboardScreen },
                    { title: "Ratings", component: RatingsScreen },
                  ]}
                />
              </div>
            </context.Provider>
          )
        }}
      </Query>
    )
  }
}
