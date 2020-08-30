const resolvers = {
  Query: {
    users: (parent, args, { models: { users } }) => users,
    user: (parent, { id }, { models: { users } }) => users.filter(user => user.id === id)[0],
    me: (parent, args, { me }) => me
  },
  Mutation: {
    createUser: (parent, { id, name }, { models: { users } }) => {
      const user = {
        id,
        name
      };
      users.push(user);
      return user;
    },
    deleteUser: (parent, { id }, { models: { users } }) => {
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
    cars: (parent, args, { models: { cars } }) => cars.filter(car => car.ownedBy === parent.id)
  }
};

module.exports = resolvers;