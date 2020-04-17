'use strict';
module.exports = (sequelize, DataTypes) => {
  class Attendance extends sequelize.Sequelize.Model {}

  Attendance.init({
    attendanceDate: DataTypes.DATE
  }, {
    sequelize
  });

  Attendance.associate = function(models) {
    // associations can be defined here
    Attendance.hasMany(models.StudentAttendance);
  };

  return Attendance;
};