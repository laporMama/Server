'use strict';
module.exports = (sequelize, DataTypes) => {
  class Student extends sequelize.Sequelize.Model {}

  Student.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Student name cannot be empty' },
        notEmpty: { args: true, msg: 'Student name cannot be empty' },
        len: {
          args: [1],
          msg: 'Student name cannot be empty'
        }
      }
    },
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Class cannot be empty' },
        isInt: { args: true, msg: 'Class not found' }
      }
    },
    ParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Parent cannot be empty' },
        isInt: { args: true, msg: 'Parent not found' }
      }
    }
  }, {
    sequelize
  });

  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsTo(models.Class);
    Student.belongsTo(models.User, {
			targetKey: 'id', 
			foreignKey: 'ParentId'
		});
    Student.hasMany(models.Report);
    Student.hasMany(models.StudentAttendance);
  };

  return Student;
};