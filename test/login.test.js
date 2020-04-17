const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/helper')

describe('Login test section', () => {
  beforeAll(async done => {
    const teacher = {
      name: 'teacher',
      email: 'teacher@mail.com',
      password: '12345',
      role: 'teacher',
      phoneNumber: '081234432180'
    }
    const parent = {
      name: 'parent',
      email: 'parent@mail.com',
      password: '12345',
      role: 'parent',
      phoneNumber: '081234432180'
    }
    const admin = {
      name: 'admin',
      email: 'admin@mail.com',
      password: '12345',
      role: 'admin',
      phoneNumber: '081234432180'
    }
    await User.create(teacher)
    await User.create(parent)
    await User.create(admin)
    done()
  })
  afterAll(async done => {
    await queryInterface.bulkDelete('Users', null, {})
    done()
  })
  
  describe('success response, will returning status code 200, token and message', () => {
    test('Teachers login', (done) => {
      request(app)
        .post('/login')
        .send({
          email: 'teacher@mail.com',
          password: '12345'
        })
        .end((err, { status, body, text }) => {
          console.log(text);
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
          password: '12345'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(200)
          expect(body).toHaveProperty('token')
          expect(body.message).toBe('Success login as parent') // parent name
          done()
        })
    })
    test('Admin Login', (done) => {
      request(app)
        .post('/login')
        .send({
          email: 'admin@mail.com',
          password: '12345'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(200)
          expect(body).toHaveProperty('token')
          expect(body.message).toBe('Success login as admin') // admin name
          done()
        })
    })
  })
  describe('Error response', () => {
    test('Because email is invalid', done => {
      request(app)
        .post('/login')
        .send({
          email: 'teach@mail.com',
          password: '12345'
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
          email: 'teacher@mail.com',
          password: '123456'
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