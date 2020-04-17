'use strict';
module.exports = (sequelize, DataTypes) => {
  class Teacher extends sequelize.Sequelize.Model {}

  Teacher.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'User Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid User Id' }
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Course Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid Course Id' }
      }
    }
  }, {
    sequelize
  });

  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.User);
    Teacher.belongsTo(models.Course);
  };
  
  return Teacher;
};