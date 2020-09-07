require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const models = require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const getLoggedInUser = req => {
  const token = req.headers['x-auth-token'];
  if (token) {
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      return verified;
    } catch (error) {
      throw new Error('Session expired');
    }
  }
};

//const me = models.users[0];
//GraphQL is agnostic about the storage data
//Schema definition for GraphQL Queries and Mutations
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    models,
    secret: process.env.JWT_SECRET,
    me: getLoggedInUser(req)
  })
});

server.applyMiddleware({ app });
app.use(cors());

app.listen(3000, () => console.info('Apollo GraphQL server is running on port localhost:3000/graphql'));