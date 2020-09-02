const Sequelizr = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://keycloak:password@0.0.0.0:5432/graphqlninja', {
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    timestamps: false
  }
});

module.exports = {
  sequelize
};