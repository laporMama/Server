'use strict';
module.exports = (sequelize, DataTypes) => {
  class StudentAttendance extends sequelize.Sequelize.Model {}

  StudentAttendance.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status cannot be empty'
        },
        len: {
          args: [1],
          msg: 'Status cannot be empty'
        }
      }
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Student cannot be empty'
        }
      }
    },
    AttendanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Date cannot be empty'
        }
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