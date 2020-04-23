'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reports', [
      {
        score: 80,
        reportDate: new Date('2/10/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        reportDate: new Date('2/10/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 50,
        reportDate: new Date('2/11/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        reportDate: new Date('2/11/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 80,
        reportDate: new Date('2/12/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        reportDate: new Date('2/12/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 85,
        reportDate: new Date('2/13/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 75,
        reportDate: new Date('2/13/2020'),
        type: 'uts',
        StudentId: 1,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 75,
        reportDate: new Date('4/13/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 80,
        reportDate: new Date('4/13/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 98,
        reportDate: new Date('4/14/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 80,
        reportDate: new Date('4/14/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 70,
        reportDate: new Date('4/15/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 40,
        reportDate: new Date('4/15/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 85,
        reportDate: new Date('4/16/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 85,
        reportDate: new Date('4/16/2020'),
        type: 'uas',
        StudentId: 1,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 80,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 95,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 87,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 91,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 83,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 100,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 1,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        score: 82,
        reportDate: new Date('2/10/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 93,
        reportDate: new Date('2/10/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 45,
        reportDate: new Date('2/11/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        reportDate: new Date('2/11/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 88,
        reportDate: new Date('2/12/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 89,
        reportDate: new Date('2/12/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 68,
        reportDate: new Date('2/13/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 77,
        reportDate: new Date('2/13/2020'),
        type: 'uts',
        StudentId: 4,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 85,
        reportDate: new Date('4/13/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 89,
        reportDate: new Date('4/13/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 98,
        reportDate: new Date('4/14/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 92,
        reportDate: new Date('4/14/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 71,
        reportDate: new Date('4/15/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 42,
        reportDate: new Date('4/15/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 83,
        reportDate: new Date('4/16/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 82,
        reportDate: new Date('4/16/2020'),
        type: 'uas',
        StudentId: 4,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 70,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 96,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 88,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 75,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 87,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 81,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 100,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 100,
        reportDate: new Date('4/17/2020'),
        type: 'harian',
        StudentId: 4,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reports', null, {});
  }
};
