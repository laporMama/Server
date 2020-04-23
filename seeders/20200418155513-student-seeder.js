'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        name: 'Lukman Bayhaqi',
        ParentId: 5,
        ClassId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Ganang Prakoso',
        ParentId: 4,
        ClassId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Ridza Adhaandra',
        ParentId: 4,
        ClassId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Adam Jay Pramusti',
        ParentId: 5,
        ClassId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Arnold Therigan',
        ParentId: 4,
        ClassId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sofyan Setiawan',
        ParentId: 3,
        ClassId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
