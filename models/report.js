'use strict';
module.exports = (sequelize, DataTypes) => {
  class Report extends sequelize.Sequelize.Model {}

  Report.init({
    score: DataTypes.INTEGER,
    reportDate: DataTypes.DATE,
    type: DataTypes.STRING,
    StudentId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize
  });
  
  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.Course);
    Report.belongsTo(models.Student);
  };

  return Report;
};