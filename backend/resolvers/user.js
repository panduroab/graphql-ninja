const models = require("../models");
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const createToken = (user, secret, expiresIn) => {
  const { id, name, username } = user;
  return jwt.sign({ id, name, username }, secret, { expiresIn });
}

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
    register: async (parent, { name, username, password }, { models: { User } }) => {
      try {
        const user = {
          name,
          username,
          password
        };
        const registeredUser = await User.create(user);
        if (typeof registeredUser.id === 'number') {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    login: async (parent, { username, password }, { models: { User }, secret }) => {
      const loginError = "Incorrect User or Password.";
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new Error(loginError);
        }
        const valid = await user.validatePassword(password);
        if (!valid) {
          throw new Error(loginError);
        }
        return {
          token: createToken(user, secret, '30m')
        }
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    uploadImage: async (parent, { filename }, { models: { User }, me }) => {
      if (!me) {
        throw new Error('Not authenticated')
      }
      const mainDir = path.dirname(require.main.filename);
      filename = `${mainDir}/uploads/${filename}`;
      try {
        const photo = await cloudinary.v2.uploader.upload(filename);
        const photoURI = `${photo.public_id}.${photo.format}`;
        await User.update({
          photo: photoURI
        }, {
          where: { username: me.username }
        });
        return photoURI;
      } catch (error) {
        return error
      }
    }
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