'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [
      {
        name: 'Matematika',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sejarah',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bahasa Indonesia',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bahasa Inggris',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Seni Budaya',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Penjaskes',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'IPA',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'IPS',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
