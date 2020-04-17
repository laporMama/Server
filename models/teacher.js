'use strict';
module.exports = (sequelize, DataTypes) => {
  class Teacher extends sequelize.Sequelize.Model {}

  Teacher.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args:true
        }
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args:true
        }
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