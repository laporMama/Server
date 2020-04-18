const request = require('supertest')
const app = require('../app.js')
const { User, Student, Report, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/helper.js')
let token = ''
let tokent = ''
let id = 0

describe.skip('/reports section, only user who have role "teacher" can do this actions', () => {
  beforeAll(async done => {
    try {
      const teacher = {
        name: 'teacher',
        email: 'teacher@mail.com',
        password: '12345',
        role: 'teacher',
        phoneNumber: '081234432180'
      }
      const dummy = {
        name: 'parent',
        email: 'parent@mail.com',
        password: '12345',
        role: 'parent',
        phoneNumber: '081234432180'
      }
      const reports = {
        student: 'dummy',
        date: new Date(),
        type: 'uts',
        course: 'ipa'
      }
      const dataTeacher = await User.create(teacher)
      const dataDummy = await User.create(dummy)
      const student = {
        name: 'student',
        class: 'IX 1',
        parentId: dataDummy.id
      }
      const dataReport = await Report.create(reports)
      await Student.create(student)
      token = generateToken({
        id: dataTeacher.id,
        email: dataTeacher.email
      })
      tokent = generateToken({
        id: dataDummy.id,
        email: dataDummy.email
      })
      id = dataReport.id
      done()
    } catch (error) {
      done(error)
    }
  })
  afterAll(async done => {
    try {
      await queryInterface.bulkDelete('Users', null, {})
      done()
    } catch (error) {
      done(error)
    }
  })
  describe('Create reports section', () => {
    describe('Success response', () => {
      test('will returning status code 201 and message', done => {
        request(app)
          .post('/reports')
          .set('token', token)
          .send({
            student: 'student',
            date: new Date(),
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(201)
            expect(body.message).toBe('Success create student report')
            // 'Success create student report' => studentnya bukan nama si studentnya
            done()
          })
      })
    })
    describe.skip('Error response', () => {
      test.skip("Because user role doesn't teacher", done => {
        request(app)
          .post('/reports')
          .set('token', tokent)
          .send({
            student: 'student',
            date: new Date(),
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only teacher can do this action')
            done()
          })
      })
      test('Because student name empty', done => {
        request(app)
          .post('/reports')
          .set('token', token)
          .send({
            student: '',
            date: new Date(),
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Student name cannot be empty')
            done()
          })
      })
      test('Because reports date empty', done => {
        request(app)
          .post('/reports')
          .set('token', token)
          .send({
            student: 'student',
            date: null,
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body).toHaveProperty('message')
            done()
          })
      })
      test('Because reports type empty', done => {
        request(app)
          .post('/reports')
          .set('token', token)
          .send({
            student: 'student',
            date: new Date(),
            type: '',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Report type cannot be empty')
            done()
          })
      })
      test('Because reports course empty', done => {
        request(app)
          .post('/reports')
          .set('token', token)
          .send({
            student: 'student',
            date: new Date(),
            type: 'uas',
            course: ''
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Report type cannot be empty')
            done()
          })
      })
    })
  })
  describe.skip('Get all reports section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and list reports', done => {
        request(app)
          .get('/reports')
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body).toHaveProperty('data')
            done()
          })
      })
    })
    describe('Error response', () => {
      test.skip("Because role who want to create isn't admin", done => {
        request(app)
          .get('/reports')
          .set('token', tokent)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
    })
  })
  describe.skip('Update reports section', () => {
    describe('Success response', () => {
      test('will returning status code 200 and message', done => {
        request(app)
          .put('/reports/' + id)
          .set('token', token)
          .send({
            student: 'budhi',
            date: new Date(),
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success update student report')
            done()
          })
      })
    })
    describe('Error response', () => {
      test.skip("Because user role doesn't teacher", done => {
        request(app)
          .put('/reports/' + id)
          .set('token', tokent)
          .send({
            student: 'student',
            date: new Date(),
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only teacher can do this action')
            done()
          })
      })
      test('Because student name empty', done => {
        request(app)
          .put('/reports/' + id)
          .set('token', token)
          .send({
            student: '',
            date: new Date(),
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Student name cannot be empty')
            done()
          })
      })
      test('Because reports date empty', done => {
        request(app)
          .put('/reports/' + id)
          .set('token', token)
          .send({
            student: 'student',
            date: null,
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body).toHaveProperty('message')
            done()
          })
      })
      test('Because reports type empty', done => {
        request(app)
          .put('/reports/' + id)
          .set('token', token)
          .send({
            student: 'student',
            date: new Date(),
            type: '',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Report type cannot be empty')
            done()
          })
      })
      test('Because reports course empty', done => {
        request(app)
          .put('/reports/' + id)
          .set('token', token)
          .send({
            student: 'student',
            date: new Date(),
            type: 'uas',
            course: ''
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Report type cannot be empty')
            done()
          })
      })
    })
  })
  describe.skip('Delete reports section', () => {
    describe('Error response', () => {
      test.skip("Because role isn't admin", done => {
        request(app)
          .delete('/reports/' + id)
          .set('token', tokent)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test.skip("Because reports doesnt exist", done => {
        request(app)
          .delete('/reports/' + 100)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(404)
            expect(body.message).toBe('Report data not found')
            done()
          })
      })
    })
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .delete('/reports/' + id)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success delete data student')
            done()
          })
      })
    })
  })
})