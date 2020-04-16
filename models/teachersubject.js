'use strict';
module.exports = (sequelize, DataTypes) => {
  class TeacherSubject extends sequelize.Sequelize.Model {}

  TeacherSubject.init({
    SubjectId: DataTypes.INTEGER,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize
  })
  
  TeacherSubject.associate = function(models) {
    // associations can be defined here
    TeacherSubject.belongsTo(models.Subject)
    TeacherSubject.belongsTo(models.Teacher)
  };
  return TeacherSubject;
};