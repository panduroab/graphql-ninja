const { sequelize } = require('./models/database');
const models = require('./models');

const createData = async () => {
  await models.User.create({
    name: 'Victor',
    username: 'victor',
    password: 'strongpwd',
    cars: [
      {
        make: 'Suzuki',
        model: 'Vitara Boosterjet',
        color: 'Black & Gray',
      }
    ]
  }, {
    include: [
      models.Car
    ]
  })
  await models.User.create({
    name: 'Manuel',
    username: 'manuel',
    password: 'strongpwd',
    cars: [
      {
        make: 'Honda',
        model: 'Civic',
        color: 'White',
      }
    ]
  }, {
    include: [
      models.Car
    ]
  })
  await models.User.create({
    name: 'Ana',
    username: 'ana',
    password: 'strongpwd',
    cars: [
      {
        make: 'VW',
        model: 'Polo',
        color: 'Silver',
      }
    ]
  }, {
    include: [
      models.Car
    ]
  })
}

sequelize.sync({force: true}).then(async () => {
  try {
    await createData();
  } catch (err) {
    console.error(err);
  }
});