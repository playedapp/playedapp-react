import { gql } from "apollo-boost"

export default gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      games {
        id
        title
        cover {
          url
        }
        averageRating
      }
      images {
        id
        url
      }
    }
  }
`
