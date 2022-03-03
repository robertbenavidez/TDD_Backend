const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model;

class User extends Model {}
// first param is attributes second param is options
User.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: Sequelize.STRING,
  },
  {
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;
