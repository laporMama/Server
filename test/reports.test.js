const request = require('supertest')
const app = require('../app.js')
const { User, Student, Report, Course, Class, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/helper.js')
let tokenTeacher = ''
let tokenParent = ''
let reportId = 0
let courseId = 0
let studentId = 0

describe.skip('/reports section, only user who have role "teacher" can do this actions', () => {
  beforeAll(done => {
    const teacher = {
      name: 'teacher',
      email: 'teacher@mail.com',
      password: '12345',
      role: 'teacher',
      phoneNumber: '081234432180'
    }

    let parent = null

    // const reports = {
    //   score: 99,
    //   reportDate: new Date(),
    //   type: 'uas',
    //   CourseId: courseId,
    //   StudentId: studentId
    // }

    User.create(teacher)
      .then(result => {
        tokenTeacher = generateToken({
          id: result.id,
          email: result.email,
          role: result.role
        })

        return User.create({
          name: 'parent',
          email: 'parent@mail.com',
          password: '12345',
          role: 'parent',
          phoneNumber: '081234432180'
        })
      })
      .then(result => {
        parent = result

        tokenParent = generateToken({
          id: result.id,
          email: result.email,
          role: result.role
        })

        return Course.create({
          name: 'MTK'
        })
      })
      .then(result => {
        courseId = result.id

        return Class.create({
          name: 'IX-A'
        })
      })
      .then(result => {
        const student = {
          name: 'student',
          ClassId: result.id,
          ParentId: parent.id
        }

        return Student.create(student)
      })
      .then(result => {
        studentId = result.id
        done()
        // return Report.create(reports)
      })
      // .then(result => {
      //   reportId = result.id
      // })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface.bulkDelete('Users', null, {})
      .then(() => {
        done()
      })
      .catch(done)
  })

  describe('Create reports section', () => {
    describe('Success response', () => {
      test('will returning status code 201 and message', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            reportDate: new Date(),
            type: 'uas',
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body, text }) => {
            expect(err).toBeNull()
            expect(status).toBe(201)
            expect(body.message).toBe('Success create student report')
            // 'Success create student report' => studentnya bukan nama si studentnya
            done()
          })
      })
    })
    describe('Error response', () => {
      test("Because user role doesn't teacher", done => {
        request(app)
          .post('/reports')
          .set('token', tokenParent)
          .send({
            score: 85,
            reportDate: new Date(),
            type: 'uas',
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only teacher can do this action')
            done()
          })
      })
      test('Because student id is null', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            reportDate: new Date(),
            type: 'uas',
            CourseId: courseId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
					  expect(body.message).toContain('StudentId cannot be null')
            done()
          })
      })
      test('Because student id is empty', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            reportDate: new Date(),
            type: 'uas',
            CourseId: 'courseId',
            StudentId: ''
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toContain('StudentId cannot be empty')
            done()
          })
      })
      test('Because reports date null', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            type: 'uas',
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body).toHaveProperty('message')
            expect(body.message).toContain('Report date cannot be null')
            done()
          })
      })
      test('Because reports date empty', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            type: 'uas',
            reportDate: '',
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body).toHaveProperty('message')
            expect(body.message).toContain('Report date cannot be empty')
            done()
          })
      })
      test('Because reports type null', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            reportDate: new Date(),
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Report type cannot be null')
            done()
          })
      })
      test('Because reports type empty', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            type: '',
            reportDate: new Date(),
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Report type cannot be empty')
            done()
          })
      })
      test('Because reports type is invalid', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            type: 'abc',
            reportDate: new Date(),
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Report type is invalid')
            done()
          })
      })
      test('Because course id null', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            type: 'uas',
            reportDate: new Date(),
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('CourseId cannot be null')
            done()
          })
      })
      test('Because course id empty', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 85,
            type: 'uas',
            reportDate: new Date(),
            StudentId: studentId,
            CourseId: ''
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('CourseId cannot be empty')
            done()
          })
      })
      test('Because reports score is lower than 0', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: -1,
            type: 'uas',
            reportDate: new Date(),
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Minimum score is 0')
            done()
          })
      })
      test('Because reports score is greater than 100', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            score: 101,
            type: 'uas',
            reportDate: new Date(),
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Maximum score is 100')
            done()
          })
      })
      test('Because reports score is null', done => {
        request(app)
          .post('/reports')
          .set('token', tokenTeacher)
          .send({
            type: 'uas',
            reportDate: new Date(),
            CourseId: courseId,
            StudentId: studentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Score should be a number')
            done()
          })
      })
    })
  })

  describe('Get all reports section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and list reports', done => {
        request(app)
          .get('/reports')
          .set('token', tokenTeacher)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body).toHaveProperty('data')
            done()
          })
      })
    })
  //   describe('Error response', () => {
  //     test.skip("Because role who want to create isn't admin", done => {
  //       request(app)
  //         .get('/reports')
  //         .set('token', tokent)
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(403)
  //           expect(body.message).toBe('Only admin can do this action')
  //           done()
  //         })
  //     })
  //   })
  // })
  // describe('Update reports section', () => {
  //   describe('Success response', () => {
  //     test('will returning status code 200 and message', done => {
  //       request(app)
  //         .put('/reports/' + id)
  //         .set('token', token)
  //         .send({
  //           student: 'budhi',
  //           date: new Date(),
  //           type: 'uas',
  //           course: 'matematika'
  //         })
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(200)
  //           expect(body.message).toBe('Success update student report')
  //           done()
  //         })
  //     })
  //   })
  //   describe('Error response', () => {
  //     test.skip("Because user role doesn't teacher", done => {
  //       request(app)
  //         .put('/reports/' + id)
  //         .set('token', tokent)
  //         .send({
  //           student: 'student',
  //           date: new Date(),
  //           type: 'uas',
  //           course: 'matematika'
  //         })
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(403)
  //           expect(body.message).toBe('Only teacher can do this action')
  //           done()
  //         })
  //     })
  //     test('Because student name empty', done => {
  //       request(app)
  //         .put('/reports/' + id)
  //         .set('token', token)
  //         .send({
  //           student: '',
  //           date: new Date(),
  //           type: 'uas',
  //           course: 'matematika'
  //         })
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(400)
  //           expect(body.message).toBe('Student name cannot be empty')
  //           done()
  //         })
  //     })
  //     test('Because reports date empty', done => {
  //       request(app)
  //         .put('/reports/' + id)
  //         .set('token', token)
  //         .send({
  //           student: 'student',
  //           date: null,
  //           type: 'uas',
  //           course: 'matematika'
  //         })
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(400)
  //           expect(body).toHaveProperty('message')
  //           done()
  //         })
  //     })
  //     test('Because reports type empty', done => {
  //       request(app)
  //         .put('/reports/' + id)
  //         .set('token', token)
  //         .send({
  //           student: 'student',
  //           date: new Date(),
  //           type: '',
  //           course: 'matematika'
  //         })
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(400)
  //           expect(body.message).toBe('Report type cannot be empty')
  //           done()
  //         })
  //     })
  //     test('Because reports course empty', done => {
  //       request(app)
  //         .put('/reports/' + id)
  //         .set('token', token)
  //         .send({
  //           student: 'student',
  //           date: new Date(),
  //           type: 'uas',
  //           course: ''
  //         })
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(400)
  //           expect(body.message).toBe('Report type cannot be empty')
  //           done()
  //         })
  //     })
  //   })
  // })
  // describe('Delete reports section', () => {
  //   describe('Error response', () => {
  //     test.skip("Because role isn't admin", done => {
  //       request(app)
  //         .delete('/reports/' + id)
  //         .set('token', tokent)
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(403)
  //           expect(body.message).toBe('Only admin can do this action')
  //           done()
  //         })
  //     })
  //     test.skip("Because reports doesnt exist", done => {
  //       request(app)
  //         .delete('/reports/' + 100)
  //         .set('token', token)
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(404)
  //           expect(body.message).toBe('Report data not found')
  //           done()
  //         })
  //     })
  //   })
  //   describe('Success response', () => {
  //     test('Will returning status code 200 and message', done => {
  //       request(app)
  //         .delete('/reports/' + id)
  //         .set('token', token)
  //         .end((err, { status, body }) => {
  //           expect(err).toBeNull()
  //           expect(status).toBe(200)
  //           expect(body.message).toBe('Success delete data student')
  //           done()
  //         })
  //     })
  //   })
  })
})