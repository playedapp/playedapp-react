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
