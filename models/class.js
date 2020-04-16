'use strict';
module.exports = (sequelize, DataTypes) => {
  class Class extends sequelize.Sequelize.Model{}

  Class.init({
    name: DataTypes.STRING
  }, {
    sequelize
  })

  Class.associate = function(models) {
    // associations can be defined here
    Class.hasMany(models.Student)
  };
  return Class;
};