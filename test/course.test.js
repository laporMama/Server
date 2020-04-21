const request = require('supertest')
const app = require('../app.js')
const { User, Course, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers')
let token = ''
let tokent = ''
let id = 0

describe('/course section, only admin can do this action', () => {
  beforeAll(done => {
    User.create({
      name: 'admin',
      email: 'admin@mail.com',
      password: '12345',
      role: 'admin',
      phoneNumber: '081234432180'
    })
      .then(data => {
        token = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        return User.create({
          name: 'teacher',
          email: 'teacher@mail.com',
          password: '12345',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
      })
      .then(data => {
        tokent = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        return Course.create({
          name: 'SBK'
        })
      })
      .then(data => {
        id = data.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  afterAll(done => {
    queryInterface.bulkDelete('Users', null, {})
      .then(_ => {
        return queryInterface.bulkDelete('Course', null, {})
      })
      .then(_ => {
        done()
      })
      .catch(done)
  })
  describe('Create section', () => {
    describe('Success response', () => {
      test('Will returning status code 201 and message', done => {
        request(app)
          .post('/course')
          .set('token', token)
          .send({
            name: 'Penjas'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(201)
            expect(body.message).toBe('Success create course')
            done()
          })
      })
    })
    describe('Error response', () => {
      test("Because user role isn't admin", done => {
        request(app)
          .post('/course')
          .set('token', tokent)
          .send({
            name: 'Penjas'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test("Because course name empty", done => {
        request(app)
          .post('/course')
          .set('token', token)
          .send({
            name: ''
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Course name cannot be empty')
            done()
          })
      })
    })
  })
  describe('Find all section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and data', done => {
        request(app)
          .get('/course')
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
      test("Because user role isn't admin", done => {
        request(app)
          .get('/course')
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
  describe('Update section', () => {
    describe('Success response', () => {
      test('Will returning sttaus code 200 and message', done => {
        request(app)
          .put('/course/' + id)
          .set('token', token)
          .send({
            name: 'Penjaskes'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success update course')
            done()
          })
      })
    })
    describe('Error response', () => {
      test("Because user role isn't admin", done => {
        request(app)
          .put('/course/' + id)
          .set('token', tokent)
          .send({
            name: 'Penjaskes'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test("Because course name empty", done => {
        request(app)
          .put('/course/' + id)
          .set('token', token)
          .send({
            name: ''
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Course name cannot be empty')
            done()
          })
      })
    })
  })
  describe('Delete section', () => {
    describe('Error response', () => {
      test("Because user role isn't admin", done => {
        request(app)
          .delete('/course/' + id)
          .set('token', tokent)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
    })
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .delete('/course/' + id)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success delete course')
            done()
          })
      })
    })
  })
})