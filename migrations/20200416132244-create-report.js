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
				onUpdate: 'cascade'
      },
      StudentId: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Students',
					key: 'id'
				},
				onDelete: 'cascade',
				onUpdate: 'cascade'
      },
      score: {
        type: Sequelize.INTEGER
      },
      reportDate: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
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