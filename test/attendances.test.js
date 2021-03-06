const request = require('supertest')
const app = require('../app.js')
const { User, Student, StudentAttendance, Attendance, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers')
let token = ''
let tokent = ''
let id = 0
let AttendanceId = null
let StudentId = null

describe('/attendances sections, only user who have role "teacher" can do this action', () => {
  beforeAll(done => {
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
    User.create(teacher)
      .then(data => {
        token = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        return Attendance.create({
          attendanceDate: new Date()
        })
      })
      .then(data => {
        AttendanceId = data.id
        return User.create(dummy)
      })
      .then(data => {
        tokent = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        return Student.create({
          name: 'student',
          ClassId: 1,
          ParentId: data.id
        })
      })
      .then(data => {
        StudentId = data.id
        return Student.create({
          name: 'student2',
          ClassId: 1,
          ParentId: data.ParentId
        })
      })
      .then(data => {
        return StudentAttendance.create({
          StudentId: data.id,
          status: 'sakit',
          AttendanceId
        })
      })
      .then(data => {
        id = data.id
        done()
      })
      .catch(done)
  })
  afterAll(done => {
    queryInterface.bulkDelete('Users', null, {})
      .then(() => {
        return queryInterface.bulkDelete('Student', null, {})
      })
      .then(() => {
        return queryInterface.bulkDelete('StudentAttendance', null, {})
      })
      .then(() => {
        return queryInterface.bulkDelete('Attendance', null, {})
      })
      .then(() => {
        done()
      })
      .catch(done)
  })
  describe('Create attendances section', () => {
    describe('Success response', () => {
      test('Will returning status code 201 and message', done => {
        request(app)
          .post('/attendances')
          .set('token', token)
          .send({
            data: [{
              StudentId,
              status: 'hadir'
            }]
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(201)
            expect(body.message).toBe('Success create attendances')
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
            StudentId,
            status: 'hadir'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only teacher can do this action')
            done()
          })
      })
      test('Because student empty', done => {
        request(app)
          .post('/attendances')
          .set('token', token)
          .send({
            data: [{
              StudentId: null,
              status: 'hadir'
            }]
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Student cannot be empty')
            done()
          })
      })
      test('Because status empty', done => {
        request(app)
          .post('/attendances')
          .set('token', token)
          .send({
            data: [{
              StudentId,
              status: ''
            }]
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Status cannot be empty')
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
  })
  describe('Update attendances section', () => {
    describe('Success responses', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .put('/attendances/' + id)
          .set('token', token)
          .send({
            StudentId,
            status: 'izin'
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
            StudentId,
            status: 'hadir'
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
            StudentId: null,
            status: 'hadir'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Student cannot be empty')
            done()
          })
      })
      test('Because status empty', done => {
        request(app)
          .put('/attendances/' + id)
          .set('token', token)
          .send({
            StudentId,
            status: ''
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Status cannot be empty')
            done()
          })
      })
    })
  })
  describe('Delete attendance section', () => {
    describe('Error response', () => {
      test("Because role isn't admin", done => {
        request(app)
          .delete('/attendances/' + id)
          .set('token', tokent)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only teacher can do this action')
            done()
          })
      })
    })
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .delete('/attendances/' + id)
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