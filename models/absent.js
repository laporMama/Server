'use strict';
module.exports = (sequelize, DataTypes) => {
  class Absent extends sequelize.Sequelize.Model {}

  Absent.init({
    StudentId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull: { args: true, msg: 'StudentId Cannot Null' }
      }
    },
    absentDate: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull: { args: true, msg: 'Date Cannot Null' }
      }
    },
    status: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull: { args: true, msg: 'Status Cannot Null' }
      }
    }
  }, {
    sequelize
  })

  Absent.associate = function(models) {
    // associations can be defined here
    Absent.belongsTo(models.Student)
  };

  return Absent;
};