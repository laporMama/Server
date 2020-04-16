'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TeacherSubjects', {
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
      TeacherId: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Teachers',
					key: 'id'
				},
				onDelete: 'cascade',
				onUpdate: 'cascade'
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
    return queryInterface.dropTable('TeacherSubjects');
  }
};