const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
let token = ''
let tokent = ''

describe('Register section, only user who have role "admin" can do this action', _ => {
  beforeAll(async done => {
    const dummy = {
      username: 'budi',
      email: 'budi@mail.com',
      password: '12345',
      role: 'teacher',
      phoneNumber: '081234432180'
    }
    const admin = {
      username: 'admin',
      email: 'admin@mail.com',
      password: '12345',
      role: 'admin',
      phoneNumber: '081234432180'
    }
    const dataAdmin = await User.create(admin)
    const dataDummy = await User.create(dummy)
    token = dataAdmin.token
    tokent = dataDummy.token
    done()
  })
  afterAll(async done => {
    const _ = await queryInterface.bulkDelete('Users', null, {})
    done()
  })

  describe('Success response, will returning status code 201 and message Success create <username> as <role>', _ => {
    test('Register Teacher', done => {
      request(app)
        .post('/register')
        .set('token', token)
        .send({
          name: 'teacher',
          email: 'teacher@mail.com',
          password: '12345',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(201)
          expect(body.message).toBe('Success create teacher as teacher') // <= success create <username> as <role>
          done()
        })
    })
    test('Register Parent', done => {
      request(app)
        .post('/register')
        .set('token', token)
        .send({
          name: 'parent',
          email: 'parent@mail.com',
          password: '12345',
          role: 'parent',
          phoneNumber: '081234432180'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(201)
          expect(body.message).toBe('Success create parent as parent') // <= success create <username> as <role>
          done()
        })
    })
  })
  describe('Error response', _ => {
    test("Because role isn't admin", done => {
      request(app)
        .post('/register')
        .set('token', tokent)
        .send({
          name: 'teacher',
          email: 'teacher@mail.com',
          password: '12345',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(403)
          expect(body.message).toBe('Only admin can do this action')
          done()
        })
    })
    test("Because user already exist", done => {
      request(app)
        .post('/register')
        .set('token', token)
        .send({
          name: 'teacher',
          email: 'teacher@mail.com',
          password: '12345',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(400)
          expect(body.message).toBe('teacher@mail.com already exist')
          done()
        })
    })
    test("Because password length less than 5 character", done => {
      request(app)
        .post('/register')
        .set('token', token)
        .send({
          name: 'teacher2',
          email: 'teacher2@mail.com',
          password: '1234',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(400)
          expect(body.message).toBe('Password length cannot less than 5 character')
          done()
        })
    })
    test("Because name empty", done => {
      request(app)
        .post('/register')
        .set('token', token)
        .send({
          name: '', // use validation len[1]
          email: 'teacher2@mail.com',
          password: '12345',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(400)
          expect(body.message).toBe('Name cannot be empty')
          done()
        })
    })
    test("Because email doesn't contain email format", done => {
      request(app)
        .post('/register')
        .set('token', token)
        .send({
          name: 'teacher',
          email: 'teacher2@mailcom', // use validation isEmail etc
          password: '12345',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(400)
          expect(body.message).toBe('Email must contain email format')
          done()
        })
      test("Because role empty", done => {
        request(app)
          .post('/register')
          .set('token', token)
          .send({
            name: 'teacher',
            email: 'teacher2@mail.com',
            password: '12345',
            role: '', // use validation len[1] etc
            phoneNumber: '081234432180'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Role cannot be empty')
            done()
          })
      })
      test("Because phoneNumber less than 9 character", done => {
        request(app)
          .post('/register')
          .set('token', token)
          .send({
            name: 'teacher',
            email: 'teacher2@mail.com',
            password: '12345',
            role: 'teacher',
            phoneNumber: '08123443' // use validation len[9] etc
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Phone number cannot less than 9 character')
            done()
          })
      })
    })
  })
})