'use strict';
module.exports = (sequelize, DataTypes) => {
  class Student extends sequelize.Sequelize.Model {}

  Student.init({
    ParentId: DataTypes.INTEGER,
    ClassId: DataTypes.INTEGER,
    Name: DataTypes.STRING
  }, {
    sequelize
  })

  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsTo(models.Parent)
    Student.belongsTo(models.Class)
    Student.hasMany(models.Absent)
    Student.hasMany(models.StudentSubject)
    
  };
  return Student;
};