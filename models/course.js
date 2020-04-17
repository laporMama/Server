'use strict';
module.exports = (sequelize, DataTypes) => {
  class Course extends sequelize.Sequelize.Model {}

  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true
        }
      }
    }
  }, {
    sequelize
  });

  Course.associate = function(models) {
    // associations can be defined here
    Course.hasMany(models.Teacher);
    Course.hasMany(models.Report);
  };

  return Course;
};