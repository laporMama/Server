'use strict';
module.exports = (sequelize, DataTypes) => {
  class Parent extends sequelize.Sequelize.Model {}

  Parent.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize
  })

  Parent.associate = function(models) {
    // associations can be defined here
    Parent.hasMany(models.Student)
  };

  return Parent;
};