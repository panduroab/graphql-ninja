const express = require('express');
const app = express();
const {ApolloServer, gql}= require('apollo-server-express');
const users = require('./data').users;
const me = users[0];
//GraphQL is agnostic about the storage data
//Schema definition for GraphQL Queries and Mutations
const typeDefs = gql`
  type User {
    id: ID!
    name: String! 
  }

  type Query {
    me: User
    users: [User]
    user(id: Int!): User
  }
`;

//The resolver is the controller or model that resolves the query defined in the schema
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.filter(user => user.id === id)[0],
    me: () => me 
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({app});

app.listen(3000, ()=> console.info('Apollo GraphQL server is running on port 3000'));


