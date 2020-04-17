'use strict';
module.exports = (sequelize, DataTypes) => {
  class Report extends sequelize.Sequelize.Model {}

  Report.init({
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: 100
        },
        min: {
          args: 0
        }
      }
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: false,
      valdiate: {
        notNull: {
          args: true
        },
        isAfter: {
          args: `${new Date().toDateString()}`
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull:false,
      valdiate: {
        notNull: {
          args: true
        }
      }
    },
    StudentId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true
        }
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
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
  
  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.Course);
    Report.belongsTo(models.Student);
  };

  return Report;
};