'use strict';
module.exports = (sequelize, DataTypes) => {
  class Report extends sequelize.Sequelize.Model {}

  Report.init({
    score: {
      type: DataTypes.INTEGER,
      allowNull : false, 
      validate: {
        notNull: { args: true, msg: 'Score Cannot Null' },
        min: { args: '0', msg: 'Score Cannot Negative' },
        max : { args: '100', msg: 'Score Cannot Over 100' }
      }
    },
    reportDate: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull: { args: true, msg: 'Date Cannot Null' }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Type Cannot Null' },
        notEmpty: { args: true, msg: 'Type Cannot Empty' },
      }
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Student Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid Student Id' }
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
  
  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.Course);
    Report.belongsTo(models.Student);
  };

  return Report;
};