'use strict';
module.exports = (sequelize, DataTypes) => {
  class StudentAttendance extends sequelize.Sequelize.Model {}

  StudentAttendance.init({
    status: DataTypes.STRING,
    StudentId: DataTypes.INTEGER,
    AttendanceId: DataTypes.INTEGER
  }, {
    sequelize
  });

  StudentAttendance.associate = function(models) {
    // associations can be defined here
    StudentAttendance.belongsTo(models.Student);
    StudentAttendance.belongsTo(models.Attendance);
  };
  
  return StudentAttendance;
};