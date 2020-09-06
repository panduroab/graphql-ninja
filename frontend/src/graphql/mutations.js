import { gql } from 'apollo-boost';

const mutations = gql`
  mutation createUser($name: String!) {
    createUser(name: $name) {
      id,
      name,
      cars, {
        model,
        make,
        color
      }
    }
  }
`;

export default mutations;