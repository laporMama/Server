'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Student);
    User.hasMany(models.Teacher);
  };

  return User;
};