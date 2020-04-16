'use strict';
module.exports = (sequelize, DataTypes) => {
  class Subject extends sequelize.Sequelize.Model {}

  Subject.init({
    name: DataTypes.STRING
  }, {
    sequelize
  })

  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.StudentSubject)
    Subject.hasMany(models.TeacherSubject)
  };
  return Subject;
};