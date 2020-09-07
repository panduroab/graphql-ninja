const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String! 
    cars: [Car]
  }

  type Token {
    token: String!
  }

  extend type Query {
    me: User
    users: [User]
    user(id: Int!): User
  }

  extend type Mutation {
    createUser(name: String!): User!
    deleteUser(id: Int!): Boolean!
    register(name: String!, username: String!, password: String!): Boolean!
    login(username: String!, password: String!): Token!
  }
`;

module.exports = typeDefs;