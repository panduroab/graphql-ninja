const resolvers = {
  Query: {
    cars: (parent, args, { models: { Car } }) => Car.findAll(),
    car: (parent, { id }, { models: { Car } }) => Car.findByPk(id),
  },
  Mutation: {
    createCar: (parent, params, { models: { Car } }) => {
      const car = { ...params };
      return Car.create(car);
    },
    deleteCar: (parent, { id }, { models: { Car } }) => {
      return Car.destroy({
        where: {
          id
        }
      });
    }
  },
  Car: {
    owner: (parent, args, { models: { User } }) => User.findByPk(parent.userId)
    //owner: (parent, args, { models: { users } }) => users.filter(user => user.id === parent.ownedBy)[0]
  }
};

module.exports = resolvers;