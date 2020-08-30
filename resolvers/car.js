let { cars } = require('../models');

const resolvers = {
  Query: {
    cars: () => cars,
    car: (parent, { id }) => cars.filter(car => car.id === id)[0],
  },
  Mutation: {
    createCar: (parent, params) => {
      const car = { ...params };
      cars.push(car);
      return car;
    },
    deleteCar: (parent, { id }) => {
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
    owner: parent => users.filter(user => user.id === parent.ownedBy)[0]
  }
};

module.exports = resolvers;