const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
let token = ''
let tokent = ''

describe('Create reports, only user who have role "teacher" can do this action', () => {
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
    await User.create(student)
    token = dataTeacher.token
    tokent = dataDummy.token
    done()
  })
  afterAll(async done => {
    await queryInterface.bulkDelete('Users', null, {})
    done()
  })

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
        })
    })
  })
  describe('Error response', () => {
    test("because user role doesn't teacher", done => {
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
        })
    })
  })
})