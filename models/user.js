'use strict';
const { hashPassword } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
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
    User.hasMany(models.Student, {
			sourceKey: 'id', 
			foreignKey: 'ParentId'
		});
    User.hasMany(models.Teacher);
  };

  return User;
};