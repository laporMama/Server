'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [{
      name: 'John Doe',
      ParentId: 3,
      ClassId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jane Doe',
      ParentId: 3,
      ClassId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jack Black',
      ParentId: 4,
      ClassId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Joe Black',
      ParentId: 4,
      ClassId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
