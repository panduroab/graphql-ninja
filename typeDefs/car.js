const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Car {
    id: ID!
    make: String!
    model: String!
    color: String!
    owner: User
  }

  extend type Query {
    cars: [Car]
    car(id: Int!): Car
  }

  extend type Mutation {
    createCar(id: Int!, make: String!, model: String!, color: String!): Car!
    deleteCar(id: Int!): Boolean!
  }
`;

module.exports = typeDefs;