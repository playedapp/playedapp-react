import React from "react"

const Spinner = () => {
  return (
    <div className="bg-beige fixed flex items-center justify-center pin spinner">
      <div className="spinner__bounce-1" />
      <div className="spinner__bounce-2" />
      <div className="spinner__bounce-3" />
    </div>
  )
}

export default Spinner
