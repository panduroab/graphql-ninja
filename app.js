const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const models = require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

//const me = models.users[0];
//GraphQL is agnostic about the storage data
//Schema definition for GraphQL Queries and Mutations
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    //me,
  }
});

server.applyMiddleware({ app });

app.listen(3000, () => console.info('Apollo GraphQL server is running on port localhost:3000/graphql'));