'use strict';
const { hashPassword } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: {
        args: true,
        msg: 'Email must contain email format'
      },
      notNull: {
        args: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: 'Password length cannot less than 5 character'
        },
        notNull: {
          args: true,
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role cannot be empty'
        }
      }
    },
    phoneNumber:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args:  [9],
          msg: 'Phone number cannot less than 9 character'
        }
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