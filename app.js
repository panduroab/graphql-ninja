const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
let { cars, users } = require('./data');
const me = users[0];

//GraphQL is agnostic about the storage data
//Schema definition for GraphQL Queries and Mutations
const typeDefs = gql`
  type User {
    id: ID!
    name: String! 
    cars: [Car]
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    color: String!
    owner: User!
  }

  type Query {
    me: User
    users: [User]
    user(id: Int!): User
    cars: [Car]
    car(id: Int!): Car
  }

  type Mutation {
    createUser(id: Int!, name: String!): User!
    deleteUser(id: Int!): Boolean!
  }
`;

//The resolver is the controller or model that resolves the query defined in the schema
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.filter(user => user.id === id)[0],
    cars: () => cars,
    car: (parent, { id }) => cars.filter(car => car.id === id)[0],
    me: () => me
  },
  Mutation: {
    createUser: (parent, { id, name }) => {
      const user = {
        id,
        name
      };
      users.push(user);
      return user;
    },
    deleteUser: (parent, { id }) => {
      let found = false;
      users = users.filter(user => {
        if (user.id === id) {
          found = true;
        } else {
          return users;
        }
      });
      return found;
    }
  },
  User: {
    cars: parent => cars.filter(car => car.ownedBy === parent.id)
  },
  Car: {
    owner: parent => users.filter(user => user.id === parent.ownedBy)[0]
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen(3000, () => console.info('Apollo GraphQL server is running on port localhost:3000/graphql'));