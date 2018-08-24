import React, { Component, Fragment } from "react"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import classNames from "classnames"
import {
  joinSentence,
  anonymousParticipants,
  notFollowedParticipants,
  followedParticipants,
} from "../../lib/utils"
import flowQuery from "../../queries/flow"
import Spinner from "../../components/Spinner"

export default class FlowScreen extends Component {
  render() {
    return (
      <div className="bg-beige">
        <Query query={flowQuery}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return "Error!"

            return data.flow.map(
              ({ id, participants, games, images, location }) => {
                const unknownParticipants = [
                  ...notFollowedParticipants(participants),
                  ...anonymousParticipants(participants),
                ]

                return (
                  <div key={id}>
                    <div className="flex items-center">
                      <div className="flex-no-shrink">
                        <div className="flex flex-row items-center p-s">
                          {followedParticipants(participants).map(
                            ({ person }, index) => (
                              <img
                                key={index}
                                className={classNames(
                                  "rounded-full border-beige border-2",
                                  {
                                    "-ml-m": index > 0,
                                  },
                                )}
                                src={person.avatar.url}
                                alt=""
                                width="35"
                                height="35"
                              />
                            ),
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink flex-no-grow overflow-hidden">
                        <p className="truncate font-nunito text-15 font-semibold">
                          {joinSentence(
                            followedParticipants(participants).map(
                              ({ person }) => person.name,
                            ),
                          )}
                        </p>
                        {location && (
                          <p className="font-nunito text-12 font-normal text-beige-dark">
                            {location.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        {images.slice(0, 1).map(({ url }) => (
                          <img src={url} alt="" className="w-full block" />
                        ))}
                      </div>
                      <div className="bg-white p-s">
                        <div className="flex flex-col">
                          <div className="flex">
                            <div className="w-4/5 pr-s">
                              <div>
                                Played{" "}
                                <Link
                                  className="text-primary no-underline font-bold"
                                  to={`/games/${games[0].id}`}
                                >
                                  {games[0].title}
                                </Link>
                                {unknownParticipants.length === 1 &&
                                  " with one other"}
                                {unknownParticipants.length > 1 &&
                                  ` with ${unknownParticipants.length} others`}
                              </div>
                            </div>
                            <div className="w-1/5">
                              {games
                                .slice(0, 1)
                                .map(({ id, title, cover, averageRating }) => (
                                  <Fragment>
                                    <Link to={`/games/${id}`}>
                                      <img
                                        className="-mt-l border-4 border-white rounded"
                                        src={cover.url}
                                        alt={title}
                                      />
                                    </Link>
                                    <span className="text-primary text-12 text-beige-dark">
                                      {`Avg. ${averageRating}`}
                                    </span>
                                  </Fragment>
                                ))}
                            </div>
                          </div>
                          <div className="flex content-between">
                            <span className="text-12 text-beige-dark">
                              13 minutes ago
                            </span>
                            <Link
                              className="no-underline text-beige-dark ml-auto"
                              to={`/sessions/${id}`}
                            >
                              ➜
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              },
            )
          }}
        </Query>
      </div>
    )
  }
}
