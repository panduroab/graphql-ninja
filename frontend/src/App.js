import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import User from "./components/UserList";
import CreateUserForm from "./components/CreateUserForm";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HOST,
});

const App = () => (
  <div>
    <ApolloProvider client={client}>
      <CreateUserForm />
      <hr />
      <User />
    </ApolloProvider>
  </div>
);

export default App;
