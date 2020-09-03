const resolvers = {
  Query: {
    users: (parent, args, { models: { User } }) => User.findAll(),
    user: (parent, { id }, { models: { User } }) => User.findByPk(id),
  },
  Mutation: {
    createUser: (parent, { name }, { models: { User } }) => {
      const user = { name };
      return User.create(user);
    },
    deleteUser: (parent, { id }, { models: { User } }) => {
      return User.destroy({
        where: {
          id
        }
      });
    },
  },
  User: {
    cars: (parent, args, { models: { Car } }) => Car.findAll({
      where: {
        userId: parent.id
      }
    })
  }
};

module.exports = resolvers;