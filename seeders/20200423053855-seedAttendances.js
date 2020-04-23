'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [{
      attendanceDate: new Date('4/20/2020'),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      attendanceDate: new Date('4/21/2020'),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      attendanceDate: new Date('4/22/2020'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Attendances', null, {});
  }
};
