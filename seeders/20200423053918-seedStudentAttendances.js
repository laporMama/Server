'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudentAttendances', [
      {
        status: 'hadir',
        StudentId: 1,
        AttendanceId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'alfa',
        StudentId: 2,
        AttendanceId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 3,
        AttendanceId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'sakit',
        StudentId: 4,
        AttendanceId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'izin',
        StudentId: 5,
        AttendanceId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 6,
        AttendanceId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 1,
        AttendanceId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 2,
        AttendanceId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'izin',
        StudentId: 3,
        AttendanceId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 4,
        AttendanceId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 5,
        AttendanceId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 6,
        AttendanceId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'izin',
        StudentId: 1,
        AttendanceId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'alfa',
        StudentId: 2,
        AttendanceId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 3,
        AttendanceId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'izin',
        StudentId: 4,
        AttendanceId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'hadir',
        StudentId: 5,
        AttendanceId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        status: 'sakit',
        StudentId: 6,
        AttendanceId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentAttendances', null, {});
  }
};
