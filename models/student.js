'use strict';
module.exports = (sequelize, DataTypes) => {
  class Student extends sequelize.Sequelize.Model {}

  Student.init({
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Name Cannot Null' },
        notEmpty: { args: true, msg: 'Name Cannot Empty' },
      }
    },
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Product Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid Product Id' }
      }
    },
    ParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Product Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid Product Id' }
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