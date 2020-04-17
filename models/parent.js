'use strict';
const Helper = require('../helpers/helper');

module.exports = (sequelize, DataTypes) => {
  class Parent extends sequelize.Sequelize.Model {}

  Parent.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull: { args: true, msg: 'Name Cannot Null' }
      }
    },
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
      beforeCreate(user, options) {
        user.password = Helper.hashPassword(user.password);
      }
    }
  })

  Parent.associate = function(models) {
    // associations can be defined here
    Parent.hasMany(models.Student)
  };

  return Parent;
};