import React, { Component } from "react"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import classNames from "classnames"
import {
  joinSentence,
  anonymousParticipants,
  notFollowedParticipants,
  followedParticipants,
  toOrdinal,
} from "../../lib/utils"
import flowQuery from "../../queries/flow"
import Spinner from "../../components/Spinner"
import StarRating from "../../components/StarRating"
import ErrorScreen from "../Error/ErrorScreen"

export default class FlowScreen extends Component {
  render() {
    return (
      <div className="bg-beige">
        <h1 className="visually-hidden">Flow</h1>
        <Query query={flowQuery}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <ErrorScreen />

            return data.flow.map(
              ({ id, participants, games, images, location }) => {
                const unknownParticipants = [
                  ...notFollowedParticipants(participants),
                  ...anonymousParticipants(participants),
                ]

                const mainGame = games[0]
                const expansions = games.slice(1)

                return (
                  <div key={id}>
                    <div className="flex items-center">
                      <div className="flex-no-shrink">
                        <div className="flex flex-row items-center py-s pl-m pr-s">
                          {followedParticipants(participants).map(
                            ({ person, id }, index) => (
                              <Link
                                to={`/people/${id}`}
                                key={index}
                                className={classNames({
                                  "-ml-m": index > 0,
                                })}
                              >
                                <img
                                  className="rounded-full border-beige border-2 w-35px h-35px"
                                  src={person.avatar.url}
                                  alt=""
                                />
                              </Link>
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
                          <p className="font-nunito text-12 font-normal">
                            <Link
                              className="text-beige-dark no-underline hover:underline"
                              to={`/location/${location.id}`}
                            >
                              {location.name}
                            </Link>
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        {images.slice(0, 1).map(({ url }) => (
                          <img
                            key={url}
                            src={url}
                            alt=""
                            className="w-full block"
                          />
                        ))}
                      </div>
                      <div className="bg-white shadow p-m">
                        <div className="flex flex-col">
                          <div className="flex">
                            <div className="w-4/5 pr-m">
                              <h2 className="text-black font-normal text-15 leading-tight mb-m">
                                Played{" "}
                                <Link
                                  className="text-primary no-underline font-bold"
                                  to={`/games/${mainGame.id}`}
                                >
                                  {mainGame.title}
                                </Link>
                                {unknownParticipants.length === 1 &&
                                  " with one other"}
                                {unknownParticipants.length > 1 &&
                                  ` with ${unknownParticipants.length} others`}
                              </h2>
                              <ol className="list-reset">
                                {followedParticipants(participants).map(
                                  ({ id, person, ratings, rank, score }) => {
                                    return (
                                      <li
                                        className="flex items-start mb-l"
                                        key={id}
                                      >
                                        <Link
                                          to={`/people/${id}`}
                                          className="flex-no-shrink"
                                        >
                                          <img
                                            className={classNames(
                                              "rounded-full mr-m w-45px h-45px",
                                            )}
                                            src={person.avatar.url}
                                            alt=""
                                          />
                                        </Link>
                                        <div>
                                          <h3>
                                            <Link
                                              to={`/people/${id}`}
                                              className="text-15 font-bold text-black no-underline hover:underline"
                                            >
                                              {person.name}
                                            </Link>
                                            <span className="ml-s text-12 font-normal text-beige-dark">
                                              {`${toOrdinal(rank)}, ${score}`}
                                            </span>
                                          </h3>
                                          <div className="mb-m">
                                            <StarRating
                                              rating={ratings[0].value}
                                              compareTo={
                                                ratings[0].previous
                                                  ? ratings[0].previous.value
                                                  : 0
                                              }
                                            />
                                          </div>
                                          {ratings[0].comment && (
                                            <p className="text-12 text-black">
                                              {ratings[0].comment.content}
                                            </p>
                                          )}
                                        </div>
                                      </li>
                                    )
                                  },
                                )}
                              </ol>
                            </div>
                            <div className="w-1/5">
                              <Link
                                to={`/games/${mainGame.id}`}
                                className="block"
                              >
                                <img
                                  className="-mt-l border-4 border-white rounded block"
                                  src={mainGame.cover.url}
                                  alt={mainGame.title}
                                />
                              </Link>
                              <p className="mb-m mt-s text-12 text-beige-dark text-center">
                                {`Avg. ${mainGame.averageRating}`}
                              </p>
                              {expansions.length > 0 && (
                                <div className="flex flex-row items-center">
                                  <span className="text-15 text-beige-dark -ml-s">
                                    +
                                  </span>
                                  <ul className="list-reset flex flex-row">
                                    {expansions.map(({ id, title, cover }) => (
                                      <li key={id}>
                                        <Link
                                          to={`/games/${id}`}
                                          className="block"
                                        >
                                          <img
                                            className="block object-contain w-35px h-35px"
                                            src={cover.url}
                                            alt={title}
                                          />
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
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
