const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const { GraphQLScalarType } = require('graphql');
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
    }),
    photo: (parent, { options }) => {
      let url = cloudinary.url(parent.photo);
      if (options) {
        // width: Int, q_auto: Boolean, f_auto: Boolean, face: 'face'
        const [width, q_auto, f_auto, face] = options;
        const cloudinaryOptions = {
          ...(q_auto === 'true' && { quality: 'auto' }),
          ...(f_auto === 'true' && { fetch_format: 'auto' }),
          ...(face && { crop: 'thumb', gravity: 'face' }),
          width,
          secure: true
        };
        url = cloudinary.url(parent.photo, cloudinaryOptions);
        return url;
      }
      return url;
    }
  },
  CloudinaryOptions: new GraphQLScalarType({
    name: 'CloudinaryOptions',
    parseValue(value) {//Value that you get from the client 
      return value;
    },
    serialize(value) {//Value that you sent to the client
      return value;
    },
    parseLiteral(ast) {//Sent info to resolver
      return ast.value.split(',');
    }
  })
};

module.exports = resolvers;