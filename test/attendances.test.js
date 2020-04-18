const request = require('supertest')
const app = require('../app.js')
const { User, Student, Attendance, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/helper.js')
let token = ''
let tokent = ''
let id = 0

describe('/attendances sections, only user who have role teacher can do this action', () => {
  beforeAll(async done => {
    try {
      const teacher = {
        username: 'teacher',
        email: 'teacher@mail.com',
        password: '12345',
        role: 'teacher',
        phoneNumber: '081234432180'
      }
      const dummy = {
        username: 'parent',
        email: 'parent@mail.com',
        password: '12345',
        role: 'parent',
        phoneNumber: '081234432180'
      }
      const student = {
        name: 'student',
        class: 'IX 1',
        parentEmail: 'parent@mail.com'
      }
      const student2 = {
        name: 'student2',
        class: 'IX 2',
        parentEmail: 'parent@mail.com'
      }
      const attendance = {
        student: 'student2',
        status: 'sakit',
        date: new Date()
      }
      const dataTeacher = await User.create(teacher)
      const dataDummy = await User.create(dummy)
      await Student.create(student)
      await Student.create(student2)
      const dataAttendance = await Attendance.create(attendance)
      token = generateToken({
        id: dataTeacher.data.id,
        email: dataTeacher.data.email
      })
      tokent = generateToken({
        id: dataDummy.data.id,
        email: dataDummy.data.email
      })
      id = dataAttendance.id
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

  describe('Create attendances section', () => {
    describe('Success response', () => {
      test('Will returning status code 201 and message', done => {
        request(app)
          .post('/attendances')
          .set('token', token)
          .send({
            student: 'student',
            status: 'hadir',
            date: new Date()
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(201)
            expect(body).toHaveProperty('message')
            done()
          })
      })
    })
    describe('Error responses', () => {
      test("because user role doesn't teacher", done => {
        request(app)
          .post('/attendances')
          .set('token', tokent)
          .send({
            student: 'student',
            status: 'hadir',
            date: new Date()
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
          .post('/attendances')
          .set('token', token)
          .send({
            student: '',
            status: 'hadir',
            date: new Date()
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Student name cannot be empty')
            done()
          })
      })
      test('Because status empty', done => {
        request(app)
          .post('/attendances')
          .set('token', token)
          .send({
            student: 'budi',
            status: '',
            date: new Date()
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Status cannot be empty')
            done()
          })
      })
      test('Because date empty', done => {
        request(app)
          .post('/attendances')
          .set('token', token)
          .send({
            student: 'budi',
            status: 'hadir',
            date: null
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body).toHaveProperty('message')
            done()
          })
      })
    })
  })
  describe('Get all attendances section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and list data attendances', done => {
        request(app)
          .get('/attendances')
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body).toHaveProperty('data')
            done()
          })
      })
    })
    describe('Error responses', () => {
      test("because user role doesn't teacher", done => {
        request(app)
          .get('/attendances')
          .set('token', tokent)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only teacher can do this action')
            done()
          })
      })
    })
  })
  describe('Update attendances section', () => {
    describe('Success responses', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .put('/attendances/' + id)
          .set('token', token)
          .send({
            student: 'student2',
            status: 'izin',
            date: new Date()
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success update student attendance')
            done()
          })
      })
    })
    describe('Error responses', () => {
      test("because user role doesn't teacher", done => {
        request(app)
          .put('/attendances/' + id)
          .set('token', tokent)
          .send({
            student: 'student',
            status: 'hadir',
            date: new Date()
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
          .put('/attendances/' + id)
          .set('token', token)
          .send({
            student: '',
            status: 'hadir',
            date: new Date()
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Student name cannot be empty')
            done()
          })
      })
      test('Because status empty', done => {
        request(app)
          .put('/attendances/' + id)
          .set('token', token)
          .send({
            student: 'budi',
            status: '',
            date: new Date()
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Status cannot be empty')
            done()
          })
      })
      test('Because date empty', done => {
        request(app)
          .put('/attendances/' + id)
          .set('token', token)
          .send({
            student: 'budi',
            status: 'hadir',
            date: null
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body).toHaveProperty('message')
            done()
          })
      })
    })
  })
  describe('Delete attendance section', () => {
    describe('Error response', () => {
      test("Because role isn't admin", done => {
        request(app)
          .delete('/attendance/' + id)
          .set('token', tokent)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test("Because attendance doesn't exist", done => {
        request(app)
          .delete('/attendance/' + 100)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(404)
            expect(body.message).toBe('Attendance data not found')
            done()
          })
      })
    })
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .delete('/attendance/' + id)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success delete data attendance')
            done()
          })
      })
    })
  })
})