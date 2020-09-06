const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String! 
    cars: [Car]
  }

  extend type Query {
    me: User
    users: [User]
    user(id: Int!): User
  }

  extend type Mutation {
    createUser(name: String!): User!
    deleteUser(id: Int!): Boolean!
  }
`;

module.exports = typeDefs;