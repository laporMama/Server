'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentSubjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SubjectId: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Subjects',
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
      Score: {
        type: Sequelize.INTEGER
      },
      Type: {
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
    return queryInterface.dropTable('StudentSubjects');
  }
};