'use strict';
module.exports = (sequelize, DataTypes) => {
  class Student extends sequelize.Sequelize.Model {}

  Student.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Name Cannot be Null' },
        notEmpty: { args: true, msg: 'Name Cannot Empty' },
      }
    },
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'ClassId Cannot be Null' },
        isInt: { args: true, msg: 'Invalid ClassId' }
      }
    },
    ParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'ParentId Cannot be Null' },
        isInt: { args: true, msg: 'Invalid ParentId' }
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