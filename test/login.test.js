const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Login test section', _ => {
  beforeAll(async done => {
    const teacher = {
      username: 'teacher',
      email: 'teacher@mail.com',
      password: '12345',
      role: 'teacher'
    }
    const parent = {
      username: 'parent',
      email: 'parent@mail.com',
      password: '12345',
      role: 'parent'
    }
    const superAdmin = {
      username: 'superAdmin',
      email: 'superAdmin@mail.com',
      password: '12345',
      role: 'superAdmin'
    }
    const _ = await User.create(teacher)
    const _ = await User.create(parent)
    const _ = await User.create(superAdmin)
    done()
  })
  afterAll(async done => {
    const _ = await queryInterface.bulkDelete('Users', null, {})
    done()
  })

  describe('/login section', _ => {
    describe('success response, will returning status code 200, token and message', _ => {
      test('Teachers login', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'teacher@mail.com', //email gausah unique
            password: '12345', //password minimal 5
            role: 'teacher' //hari sabtu diomongin
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body).toHaveProperty('token')
            expect(body.message).toBe('Success login as teacher') // teacher name
            done()
          })
      })
      test('Parents Login', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'parent@mail.com',
            password: '12345',
            role: 'parent'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body).toHaveProperty('token')
            expect(body.message).toBe('Success login as parent')
            done()
          })
      })
      test('SuperAdmin Login', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'superAdmin@mail.com',
            password: '12345',
            role: 'superAdmin'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body).toHaveProperty('token')
            expect(body.message).toBe('Success login as superAdmin')
            done()
          })
      })
    })
    describe('Error response', _ => {
      test('Because email invalid', done => {
        request(app)
          .post('/login')
          .send({
            username: 'teacher',
            email: 'teach@mail.com',
            password: '12345',
            role: 'teacher'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Invalid email / password')
            done()
          })
      })
      test('Because password invalid', done => {
        request(app)
          .post('/login')
          .send({
            username: 'teacher',
            email: 'teacher@mail.com',
            password: '123456',
            role: 'teacher'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Invalid email / password')
            done()
          })
      })
    })
  })

})