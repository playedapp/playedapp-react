import React from "react"
import PropTypes from "prop-types"
import context from "../context"
import { withContext } from "../../../lib/utils"
import Score from "../../../components/Score"
import { Link } from "react-router-dom"

const formatDuration = duration => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  if (hours && minutes) return `${hours}h ${minutes}min`
  if (hours) return `${hours}h`
  return `${minutes}min`
}

const SessionDetailsScreen = ({ context }) => {
  const {
    session: { games, playtime, participants },
  } = context

  const mainGame = games[0]
  const expansions = games.slice(1)

  return (
    <div className="bg-beige p-m flex flex-col">
      <Link
        to={`/games/${mainGame.id}`}
        className="shadow-box bg-white p-m rounded block no-underline group "
      >
        <div className="flex items-end justify-center relative">
          <ul
            className="list-reset text-right font-nunito text-12 font-semibold text-beige-dark"
            style={{ flexBasis: "50%" }}
          >
            <li>2-4</li>
            <li>90 min</li>
            <li>13+</li>
          </ul>
          <div className="mx-m">
            <img
              className="block h-auto w-auto"
              src={mainGame.cover.url}
              alt=""
              width={mainGame.cover.width}
              height={mainGame.cover.height}
              style={{ maxWidth: "85px", maxHeight: "85px" }}
            />
          </div>
          <div className="-ml-m" style={{ flexBasis: "50%" }}>
            <Score score={mainGame.averageRating} />
          </div>
          <svg
            className="fill-current text-beige-dark group-hover:text-cyan w-22px absolute pin-t pin-r"
            viewBox="0 0 45 39"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M34.757,17l-11.071,-11.071c-1.171,-1.172 -1.171,-3.071 0,-4.243c1.172,-1.171 3.071,-1.171 4.243,0l15.385,15.385l0.358,0.439c0.803,0.542 1.328,1.455 1.328,2.49c0,1.112 -0.607,2.084 -1.512,2.59l-0.376,0.46l-15.093,15.093c-1.149,1.149 -3.012,1.149 -4.162,0c-1.149,-1.149 -1.149,-3.013 0,-4.162l10.981,-10.981l-31.838,0c-1.656,0 -3,-1.344 -3,-3c0,-1.65 1.335,-2.991 3,-3l31.757,0Z" />
          </svg>
        </div>
        <h1 className="my-m font-nunito font-bold text-15 text-black text-center">
          {mainGame.title}
        </h1>
      </Link>
      {expansions.length > 0 && (
        <img
          className="self-center h-auto"
          src={require("../../../images/joint.png")}
          alt=""
          style={{ marginTop: "-4px", marginBottom: "-7px", width: 22 }}
        />
      )}
      {expansions.length > 0 &&
        expansions.map(({ id, title, cover, averageRating }) => (
          <Link
            to={`/games/${id}`}
            key={id}
            className="shadow-box bg-white p-m rounded block no-underline group"
          >
            <div className="flex items-center">
              <div>
                <Score score={averageRating} />
              </div>
              <img
                className="block w-auto h-45px"
                src={cover.url}
                alt=""
                width={cover.width}
                height={cover.height}
              />
              <h2 className="mx-m font-nunito font-bold text-15 text-black">
                {title}
              </h2>
              <svg
                className="fill-current text-beige-dark group-hover:text-cyan w-22px flex-no-shrink ml-auto"
                viewBox="0 0 45 39"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M34.757,17l-11.071,-11.071c-1.171,-1.172 -1.171,-3.071 0,-4.243c1.172,-1.171 3.071,-1.171 4.243,0l15.385,15.385l0.358,0.439c0.803,0.542 1.328,1.455 1.328,2.49c0,1.112 -0.607,2.084 -1.512,2.59l-0.376,0.46l-15.093,15.093c-1.149,1.149 -3.012,1.149 -4.162,0c-1.149,-1.149 -1.149,-3.013 0,-4.162l10.981,-10.981l-31.838,0c-1.656,0 -3,-1.344 -3,-3c0,-1.65 1.335,-2.991 3,-3l31.757,0Z" />
              </svg>
            </div>
          </Link>
        ))}
      <div className="shadow-box bg-white p-m rounded mt-l">
        <div>
          <h2 className="font-nunito text-11 text-beige-dark font-semibold uppercase">
            Playtime
          </h2>
          <p className="flex justify-between">
            <span className="font-nunito text-15">
              Total:{" "}
              <strong className="font-bold">{formatDuration(playtime)}</strong>
            </span>
            <span className="font-nunito text-12 text-beige-dark">
              Avg. for game: 1h 56min
            </span>
          </p>
          <p className="flex justify-between">
            <span className="font-nunito text-15">
              Per player:{" "}
              <strong className="font-bold">
                {formatDuration(Math.round(playtime / participants.length))}
              </strong>
            </span>
            <span className="font-nunito text-12 text-beige-dark">
              Avg. for game: 41min
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

SessionDetailsScreen.propTypes = {
  context: PropTypes.object.isRequired,
}

export default withContext(context)(SessionDetailsScreen)
