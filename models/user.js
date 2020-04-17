'use strict';
const { hashPassword } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: 'Invalid Email Address' },
        notNull: { args: true, msg: 'Email Cannot Null' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Password Cannot Null' },
        len: { args: [5, 20], msg: 'Password Length Should Be 5-20 Length' }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Role Cannot Null' }
    }
  },
    phoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len: { args: [9, 13], msg: 'Phone Number Length Should Be 9-13 Length' }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, opts) => {
        user.password = hashPassword(user.password);
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Student);
    User.hasMany(models.Teacher);
  };

  return User;
};