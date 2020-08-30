const resolvers = {
  Query: {
    cars: (parent, args, { models: { cars } }) => cars,
    car: (parent, { id }, { models: { cars } }) => cars.filter(car => car.id === id)[0],
  },
  Mutation: {
    createCar: (parent, params, { models: { cars } }) => {
      const car = { ...params };
      cars.push(car);
      return car;
    },
    deleteCar: (parent, { id }, { models: { cars } }) => {
      let found = false;
      cars = cars.filter(car => {
        if (car.id === id) {
          found = true;
        } else {
          return car;
        }
      });
      return found;
    }
  },
  Car: {
    owner: (parent, args, { models: { users } }) => users.filter(user => user.id === parent.ownedBy)[0]
  }
};

module.exports = resolvers;