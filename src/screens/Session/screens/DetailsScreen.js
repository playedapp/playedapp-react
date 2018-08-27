import React from "react"
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
          <ul className="list-reset text-right font-nunito text-12 font-semibold text-beige-dark">
            <li>2-4</li>
            <li>90 min</li>
            <li>13+</li>
          </ul>
          <div className="mx-m">
            <img src={mainGame.cover.url} alt="" width="70" />
          </div>
          <div>
            <Score score={mainGame.averageRating} />
          </div>
        </div>
        <h1 className="font-nunito font-bold text-15 text-black text-center">
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
              <img src={cover.url} alt="" width="35" />
              <h2>{title}</h2>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default withContext(context)(SessionDetailsScreen)
