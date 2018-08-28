import React from "react"
import PropTypes from "prop-types"
import context from "../context"
import { withContext } from "../../../lib/utils"
import Score from "../../../components/Score"
import { Link } from "react-router-dom"

const SessionDetailsScreen = ({ context }) => {
  const {
    session: { games },
  } = context

  const mainGame = games[0]
  const expansions = games.slice(1)

  return (
    <div className="bg-beige p-m">
      <div className="shadow-box bg-white p-m rounded">
        <div className="flex items-end justify-center">
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
              style={{
                maxWidth: "85px",
                maxHeight: "85px",
              }}
            />
          </div>
          <div style={{ flexBasis: "50%" }}>
            <Score score={mainGame.averageRating} />
          </div>
        </div>
        <h1 className="my-m font-nunito font-bold text-15 text-black text-center">
          {mainGame.title}
        </h1>
      </div>
      {expansions.length > 0 &&
        expansions.map(({ id, title, cover, averageRating }) => (
          <Link
            to={`/games/${id}`}
            key={id}
            className="shadow-box bg-white p-m rounded block no-underline"
          >
            <div className="flex items-center">
              <div>
                <Score score={averageRating} />
              </div>
              <img className="block ml-m" src={cover.url} alt="" width="35" />
              <h2 className="ml-m font-nunito font-bold text-15 text-black">
                {title}
              </h2>
            </div>
          </Link>
        ))}
    </div>
  )
}

SessionDetailsScreen.propTypes = {
  context: PropTypes.object.isRequired,
}

export default withContext(context)(SessionDetailsScreen)
