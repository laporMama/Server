'use strict';
module.exports = (sequelize, DataTypes) => {
  class StudentSubject extends sequelize.Sequelize.Model {}

  StudentSubject.init({
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER,
    Type: DataTypes.STRING
  }, {
    sequelize
  })
  
  StudentSubject.associate = function(models) {
    // associations can be defined here
    StudentSubject.belongsTo(models.Subject)
    StudentSubject.belongsTo(models.StudentId)
  };
  return StudentSubject;
};