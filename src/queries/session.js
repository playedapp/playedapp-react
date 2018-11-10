import { gql } from "apollo-boost"

export default gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      games {
        id
        title
        cover {
          url
          width
          height
        }
        averageRating
      }
      images {
        id
        url
      }
      playtime
      variants
      location {
        name
      }
      participants {
        id
      }
    }
  }
`
