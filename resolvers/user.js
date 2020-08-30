let { users } = require('../models');

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.filter(user => user.id === id)[0],
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
          return user;
        }
      });
      return found;
    },
  },
  User: {
    cars: parent => cars.filter(car => car.ownedBy === parent.id)
  }
};

module.exports = resolvers;