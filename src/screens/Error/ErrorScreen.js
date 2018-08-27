import React from "react"

const ErrorScreen = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-primary">
      <h1 className="font-fredoka text-20 text-white uppercase mb-m tracking-wide">
        Oh no!
      </h1>
      <p className="font-nunito text-15 text-cyan text-center">
        Something went horribly wrong.
      </p>
      <p className="mt-l text-20">
        <span role="img" aria-label="Sad face">
          😔
        </span>
      </p>
    </div>
  )
}

export default ErrorScreen
