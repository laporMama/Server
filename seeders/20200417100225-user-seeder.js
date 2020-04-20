'use strict';
const { hashPassword } = require('../helpers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'teacher1',
      email: 'teacher@mail.com',
      password: hashPassword('qweqwe'),
      role: 'teacher',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'teacher2',
      email: 'teacher2@mail.com',
      password: hashPassword('qweqwe'),
      role: 'teacher',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'parent1',
      email: 'parent1@mail.com',
      password: hashPassword('qweqwe'),
      role: 'parent',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'parent2',
      email: 'parent2@mail.com',
      password: hashPassword('qweqwe'),
      role: 'parent',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'parent3',
      email: 'parent3@mail.com',
      password: hashPassword('qweqwe'),
      role: 'parent',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'admin',
      email: 'admin@mail.com',
      password: hashPassword('qweqwe'),
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