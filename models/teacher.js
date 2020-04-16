'use strict';
module.exports = (sequelize, DataTypes) => {
  class Teacher extends sequelize.Sequelize.Model {}

  Teacher.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize
  })

  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.hasMany(models.TeacherSubject)
  };
  return Teacher;
};