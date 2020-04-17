'use strict';
module.exports = (sequelize, DataTypes) => {
  class Course extends sequelize.Sequelize.Model {}

  Course.init({
    name: DataTypes.STRING
  }, {
    sequelize
  });

  Course.associate = function(models) {
    // associations can be defined here
    Course.hasMany(models.Teacher);
    Course.hasMany(models.Report);
  };

  return Course;
};