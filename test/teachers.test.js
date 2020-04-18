const request = require('supertest')
const app = require('../app.js')
const { User, Teacher, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/helper.js')
let token = ''
let tokent = ''
let id = 0

describe.skip('/teachers section, only user who have role "admin" can do this action', () => {
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
    const parent = {
      name: 'parent',
      email: 'parent@mail.com',
      password: '12345',
      role: 'parent',
      phoneNumber: '081234432180'
    }
    const teacher = {
      email: 'budi@mail.com',
      course: 'Matematika'
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
        return User.create(parent)
      })
      .then(() => {
        return Teacher.create(teacher)
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
        done()
      })
      .catch(done)
  })

  describe('Create teachers section', () => {
    describe('Success response, will returning status code 201 and message', () => {
      test('Create teacher with course name Matematika', done => {
        request(app)
          .post('/teachers')
          .set('token', token)
          .send({
            email: 'budi@mail.com',
            course: 'Matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(201)
            expect(body.message).toBe('Success create teacher')
            done()
          })
      })
    })
    describe('Error response', () => {
      test("Because role who want to create isn't admin", done => {
        request(app)
          .post('/teachers')
          .set('token', tokent)
          .send({
            email: 'budi@mail.com',
            course: 'Matematika'
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
          .post('/teachers')
          .set('token', token)
          .send({
            email: '',
            course: 'Matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Teacher email cannot be empty')
            done()
          })
      })
      test('Because course empty', done => {
        request(app)
          .post('/teachers')
          .set('token', token)
          .send({
            email: 'budi@mail.com',
            course: ''
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
  describe('Find all teachers section', () => {
    describe('Success response', () => {
      test('will returning status code 200 and teachers data', done => {
        request(app)
          .get('/teeachers')
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
      test("Because role who want to create isn't admin", done => {
        request(app)
          .get('/teachers')
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
  describe('Update teachers sections', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .put('/teachers/' + id)
          .set('token', token)
          .send({
            email: 'budiman@mail.com',
            course: 'IPA'
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
            email: '',
            course: 'Matematika'
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe('Teacher email cannot be empty')
            done()
          })
      })
      test('Because course empty', done => {
        request(app)
          .put('/teachers/' + id)
          .set('token', token)
          .send({
            email: 'budi@mail.com',
            course: ''
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