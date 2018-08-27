import React from "react"

// Based on https://stackoverflow.com/a/13627586
export const toOrdinal = number => {
  const j = number % 10
  const k = number % 100

  if (j === 1 && k !== 11) return number + "st"
  if (j === 2 && k !== 12) return number + "nd"
  if (j === 3 && k !== 13) return number + "rd"
  return number + "th"
}

export const joinSentence = array => {
  if (array.length === 1) return array[0]
  const last = array.pop()
  return `${array.join(", ")} & ${last}`
}

export const followedParticipants = participants => {
  return participants.filter(
    participant => participant.person && participant.person.isFollowedByMe,
  )
}

export const notFollowedParticipants = participants => {
  return participants.filter(
    participant => participant.person && !participant.person.isFollowedByMe,
  )
}

export const anonymousParticipants = participants => {
  return participants.filter(participant => !participant.person)
}

export const withContext = context => Component => () => (
  <context.Consumer>
    {context => <Component context={context} />}
  </context.Consumer>
)
