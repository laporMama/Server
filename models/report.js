'use strict';
module.exports = (sequelize, DataTypes) => {
  class Report extends sequelize.Sequelize.Model {}

  Report.init({
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: [100],
          msg: 'Maximum score is 100'
        },
        min: {
          args: [0],
          msg: 'Minimum score is 0'
        },
        isInt: {
          args: true,
          msg: 'Score should be a number'
        }
      }
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Report date cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Report date cannot be empty'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg: 'Report type cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Report type cannot be empty'
        },
        isIn: {
          args: [['uts', 'uas', 'nilai']],
          msg: 'Report type is invalid'
        }
      }
    },
    StudentId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'StudentId cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'StudentId cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Invalid StudentId'
        }
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'CourseId cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'CourseId cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Invalid CourseId'
        }
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