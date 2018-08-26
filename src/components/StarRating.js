/* global require */
import React from "react"
import PropTypes from "prop-types"

const yellowLeft = require("../images/rating/YellowLeft.png")
const yellowRight = require("../images/rating/YellowRight.png")
const greenLeft = require("../images/rating/GreenLeft.png")
const greenRight = require("../images/rating/GreenRight.png")
const redLeft = require("../images/rating/RedLeft.png")
const redRight = require("../images/rating/RedRight.png")
const greyLeft = require("../images/rating/GreyLeft.png")
const greyRight = require("../images/rating/GreyRight.png")

const StarRating = ({ rating, compareTo }) => {
  const newHalfStars = new Array(rating / 0.5).fill(true)
  const compareHalfStars = new Array(compareTo / 0.5).fill(true)

  return (
    <div
      className="flex items-start"
      aria-label={`Rating: ${rating} (Previous: ${compareTo}`}
    >
      {new Array(10).fill("").map((val, index) => {
        const left = index % 2 === 0
        let image
        if (newHalfStars[index] === true) {
          if (compareHalfStars[index] === true) {
            image = left ? yellowLeft : yellowRight
          } else {
            image = left ? greenLeft : greenRight
          }
        } else {
          if (compareHalfStars[index] === true) {
            image = left ? redLeft : redRight
          } else {
            image = left ? greyLeft : greyRight
          }
        }
        return (
          <img
            key={index}
            src={image}
            alt=""
            width="10"
            className={left ? "" : "mr-xxs"}
            // style={{
            //    width: 10,
            //    height: 23,
            //    marginRight: left ? 0 : Spacing.xs,
            // }}
          />
        )
      })}
    </div>
  )
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  compareTo: PropTypes.number,
}

StarRating.defaultProps = {
  compareTo: 0,
}

export default StarRating
