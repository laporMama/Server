const request = require('supertest')
const app = require('../app.js')
const { User, Teacher, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers')
let token = ''
let tokent = ''
let id = 0
let UserId = 0
const CourseId = 1

describe('/teachers section, only user who have role "admin" can do this action', () => {
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
          name: 'budi',
          email: 'budi@mail.com',
          password: '12345',
          role: 'teacher',
          phoneNumber: '081234432180'
        })
      })
      .then(data => {
        UserId = data.id
        tokent = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        return User.create({
          name: 'parent',
          email: 'parent@mail.com',
          password: '12345',
          role: 'parent',
          phoneNumber: '081234432180'
        })
      })
      .then(() => {
        return Teacher.create({
          UserId,
          CourseId
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
        return queryInterface.bulkDelete('Teacher', null, {})
      })
      .then(() => {
        done()
      })
      .catch(done)
  })
  describe('Find all teachers section', () => {
    describe('Success response', () => {
      test('will returning status code 200 and teachers data', done => {
        request(app)
          .get('/teachers')
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
  describe('Update teachers sections', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .put('/teachers/' + id)
          .set('token', token)
          .send({
            UserId,
            CourseId: 2
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success update data teacher')
            done()
          })
      })
    })
    describe('Error response', () => {
      test("Because role who want to create isn't admin", done => {
        request(app)
          .put('/teachers/' + id)
          .set('token', tokent)
          .send({
            UserId,
            CourseId: 2
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test('Because email empty', done => {
        request(app)
          .put('/teachers/' + id)
          .set('token', token)
          .send({
            UserId: null,
            CourseId: 1
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Teacher cannot be empty')
            done()
          })
      })
      test('Because course empty', done => {
        request(app)
          .put('/teachers/' + id)
          .set('token', token)
          .send({
            UserId,
            CourseId: null
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Teacher course cannot be empty')
            done()
          })
      })
    })
  })
  describe('Delete teachers sections', () => {
    describe('Error response', () => {
      test("Because role who want to create isn't admin", done => {
        request(app)
          .delete('/teachers/' + id)
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
          .delete('/teachers/' + id)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success delete teacher data')
            done()
          })
      })
    })
  })
})