import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export const SummarySentence = ({
  games,
  notFollowedPlayers,
  anonymousPlayers,
}) => {
  const players = notFollowedPlayers.map(({ id, person }) => (
    <Link key={id} to={`/players/${id}`}>
      {person.name}
    </Link>
  ))

  if (anonymousPlayers.length === 1) {
    players.push("one other")
  } else if (anonymousPlayers.length > 1) {
    players.push(`${anonymousPlayers.length} others`)
  }

  return (
    <div>
      Played{" "}
      <Link
        className="text-primary no-underline font-bold"
        to={`/games/${games[0].id}`}
      >
        {games[0].title}
      </Link>{" "}
      {players.length > 0 && " with "}
      {players.reduce((arr, player, index, players) => {
        if (index === 0) {
          return [...arr, player]
        } else if (index === players.length - 1) {
          return [...arr, " and ", player]
        } else {
          return [...arr, ", ", player]
        }
      }, [])}
    </div>
  )
}

const playerList = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    person: PropTypes.shape({ name: PropTypes.string.isRequired }),
  }),
)

SummarySentence.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string }))
    .isRequired,
  notFollowedPlayers: playerList,
  anonymousPlayers: playerList,
  onPlayerPress: PropTypes.func,
  onGamePress: PropTypes.func,
}

SummarySentence.defaultProps = {
  notFollowedPlayers: [],
  anonymousPlayers: [],
}
