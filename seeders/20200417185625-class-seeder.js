'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Classes', [{
      name: 'IX-1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'IX-2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'IX-3',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classes', null, {});
  }
};
