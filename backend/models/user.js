const bcrypt = require('bcrypt');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      variable: {
        notEmpty: true
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Car, { onDelete: 'CASCADE' });
  }

  User.prototype.hashPassword = async function() {
    return await bcrypt.hash(this.password, 10);
  }

  User.beforeCreate(async user => {
    user.password = await user.hashPassword(user.password);
  });

  return User;
};

module.exports = user;