'use strict';
module.exports = (sequelize, DataTypes) => {
  class Attendance extends sequelize.Sequelize.Model {}

  Attendance.init({
    attendanceDate: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull: { args: true, msg: 'Date Cannot Null' }
      }
    }
  }, {
    sequelize
  });

  Attendance.associate = function(models) {
    // associations can be defined here
    Attendance.hasMany(models.StudentAttendance);
  };

  return Attendance;
};