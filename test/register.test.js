const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { generateToken } = require('../helpers/helper.js')
const { queryInterface } = sequelize
let token = ''
let tokent = ''

describe('Register section, only user who have role "admin" can do this action', () => {
  beforeAll(done => {
    const dummy = {
      name: 'budi',
      email: 'budi@mail.com',
      password: '12345',
      role: 'teacher',
      phoneNumber: '081234432180'
    }
    const admin = {
      name: 'admin',
      email: 'admin@mail.com',
      password: '12345',
      role: 'admin',
      phoneNumber: '081234432180'
    }
    User.create(admin)
      .then(data => {
        token = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        return User.create(dummy)
      })
      .then(data => {
        tokent = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        done()
      })
      .catch(done)
  })
  afterAll(done => {
    queryInterface.bulkDelete('Users', null, {})
      .then(() => {
        done()
      })
      .catch(done)
  })
  describe('Success response, will returning status code 201 and message success create <role>', () => {
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
          expect(body.message).toBe('Success create teacher') // <= success create <role>
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
          expect(body.message).toBe('Success create parent') // <= success create <role>
          done()
        })
    })
  })
  describe('Error response', () => {
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
          expect(body.message).toBe('Email already in use')
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
          name: '',
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
          email: 'teachermailcom',
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
    })
    test("Because role empty", done => {
      request(app)
        .post('/register')
        .set('token', token)
        .send({
          name: 'teacher',
          email: 'teacher2@mail.com',
          password: '12345',
          role: '',
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
          phoneNumber: '08123443'
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