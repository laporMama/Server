'use strict';
const { hashPassword } = require('../helpers/helper');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'teacher',
      email: 'teacher@mail.com',
      password: hashPassword(process.env.DEFAULT_PASS),
      role: 'teacher',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'parent',
      email: 'parent@mail.com',
      password: hashPassword(process.env.DEFAULT_PASS),
      role: 'parent',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'admin',
      email: 'admin@mail.com',
      password: hashPassword(process.env.DEFAULT_PASS),
      role: 'admin',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};