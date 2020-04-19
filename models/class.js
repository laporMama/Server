'use strict';
module.exports = (sequelize, DataTypes) => {
  class Class extends sequelize.Sequelize.Model{}

  Class.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Class name cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Class name cannot be empty'
        }
      }
    }
  }, {
    sequelize
  })

  Class.associate = function(models) {
    // associations can be defined here
    Class.hasMany(models.Student)
  };
  return Class;
};