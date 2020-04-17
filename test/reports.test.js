const request = require('supertest')
const app = require('../app.js')
const { User, Student, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/helper.js')
let token = ''
let tokent = ''
let id = 0

describe('/reports section, only user who have role "teacher" can do this actions', () => {
  beforeAll(async done => {
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
    const dataTeacher = await User.create(teacher)
    const dataDummy = await User.create(dummy)
    const { data } = await Student.create(student)
    token = generateToken({
      id: dataTeacher.data.id,
      email: dataTeacher.data.email
    })
    tokent = generateToken({
      id: dataDummy.data.id,
      email: dataDummy.data.email
    })
    id = data.id
    done()
  })
  afterAll(async done => {
    await queryInterface.bulkDelete('Users', null, {})
    done()
  })

  describe('Create reports', () => {
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
    describe('Error response', () => {
      test("Because user role doesn't teacher", done => {
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
            student: 'student',
            date: new Date(),
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe(' cannot be empty')
            done()
          })
      })
      test('Because reports date empty', done => {
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
            expect(status).toBe(400)
            expect(body.message).toBe(' cannot be empty')
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
            type: 'uas',
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe(' cannot be empty')
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
            course: 'matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe(' cannot be empty')
            done()
          })
      })
    })
  })
})