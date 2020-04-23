'use strict';
const { hashPassword } = require('../helpers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
      name: 'Hary Dhimas Prakoso',
      email: 'harydhimas@gmail.com',
      password: hashPassword('qweqwe'),
      role: 'teacher',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Adiel Pratama',
      email: 'adiel@gmail.com',
      password: hashPassword('qweqwe'),
      role: 'teacher',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Khalishah Ulfah',
      email: 'caca@gmail.com',
      password: hashPassword('qweqwe'),
      role: 'parent',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Irsyah Mardiah',
      email: 'icha@gmail.com',
      password: hashPassword('qweqwe'),
      role: 'parent',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Tamara Zulaika Utama',
      email: 'tamaro@gmail.com',
      password: hashPassword('qweqwe'),
      role: 'parent',
      phoneNumber: '081234432180',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Admin Lapor Mama',
      email: 'admin@lapormama.com',
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