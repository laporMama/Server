const request = require('supertest')
const app = require('../app.js')
const { User, Student, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/helper.js')
let token = ''
let tokent = ''

describe('Create reports, only user who have role teacher can do this action', () => {
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
    await Student.create(student)
    token = generateToken({
      id: dataTeacher.data.id,
      email: dataTeacher.data.email
    })
    tokent = generateToken({
      id: dataDummy.data.id,
      email: dataDummy.data.email
    })
    done()
  })
  afterAll(async done => {
    await queryInterface.bulkDelete('Users', null, {})
    done()
  })

  describe('Success response', () => {
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
        })
    })
  })
})