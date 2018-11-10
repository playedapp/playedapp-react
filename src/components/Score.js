import React from "react"
import PropTypes from "prop-types"

const Score = ({ score, size }) => {
  return (
    <div
      className="bg-primary rounded-lg w-45px h-45px flex justify-center items-center border-4 border-white"
      style={{ transform: "rotate(-45deg)" }}
    >
      <span
        className="block font-fredoka text-20 text-cyan antialiased"
        style={{ transform: "rotate(45deg)" }}
      >
        {score}
      </span>
    </div>
  )
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
  size: PropTypes.number,
}

export default Score
