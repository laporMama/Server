'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CourseId: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Courses',
					key: 'id'
				},
				onDelete: 'cascade',
				onUpdate: 'cascade',
        allowNull: false
      },
      StudentId: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Students',
					key: 'id'
				},
				onDelete: 'cascade',
				onUpdate: 'cascade',
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reportDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reports');
  }
};