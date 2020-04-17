'use strict';
module.exports = (sequelize, DataTypes) => {
  class StudentAttendance extends sequelize.Sequelize.Model {}

  StudentAttendance.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Status Cannot Null' },
        notEmpty: { args: true, msg: 'Status Cannot Empty' }
      }
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Student Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid Student Id' }
      }
    },
    AttendanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Attendance Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid Attendance Id' }
      }
    }
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