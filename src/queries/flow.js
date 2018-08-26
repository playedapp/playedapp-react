import { gql } from "apollo-boost"

export default gql`
  {
    flow {
      id
      games {
        id
        title
        averageRating
        cover {
          url
          width
          height
        }
      }
      participants {
        id
        score
        rank
        ratings {
          value
          comment {
            content
          }
          previous {
            value
          }
        }
        person {
          id
          name
          isFollowedByMe
          avatar {
            url
          }
        }
      }
      images {
        url
      }
      location {
        id
        name
      }
    }
  }
`
