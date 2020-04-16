'use strict';
module.exports = (sequelize, DataTypes) => {
  class Absent extends sequelize.Sequelize.Model {}

  Absent.init({
    StudentId: DataTypes.INTEGER,
    absentDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize
  })

  Absent.associate = function(models) {
    // associations can be defined here
    Absent.belongsTo(models.Student)
  };

  return Absent;
};