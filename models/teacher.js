'use strict';
module.exports = (sequelize, DataTypes) => {
  class Teacher extends sequelize.Sequelize.Model {}

  Teacher.init({
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize
  });

  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.User);
    Teacher.belongsTo(models.Course);
  };
  
  return Teacher;
};