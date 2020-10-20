import { gql } from "apollo-boost";

const query = gql`
  query {
    users {
      id
      name
      cars {
        id
        make
        model
        color
      }
    }
  }
`;

export default query;
