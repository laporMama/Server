'use strict';
module.exports = (sequelize, DataTypes) => {
  class Student extends sequelize.Sequelize.Model {}

  Student.init({
    name: DataTypes.STRING,
    ClassId: DataTypes.INTEGER,
    ParentId: DataTypes.INTEGER
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