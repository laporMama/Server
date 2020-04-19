const request = require('supertest')
const app = require('../app.js')
const { User, Student, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/helper.js')
let token = ''
let tokent = ''
let id = 0
let ParentId = 0
const ClassId = 1

describe.skip('/students sections, only user who have role "admin" can do this action', () => {
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
      .then(data => {
        return Student.create({
          name: 'murid',
          ClassId,
          ParentId: data.id
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
        done()
      })
      .catch(done)
  })

  describe('Create students section', () => {
    describe('Success response, will returning status code 201 and message', () => {
      test('Create Student', done => {
        request(app)
          .post('/students')
          .set('token', token)
          .send({
            name: 'student',
            ClassId,
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(201)
            expect(body).toHaveProperty('data')
            expect(body.message).toBe('Success create student as student')
            // ^ Success create <student name> as student
            done()
          })
      })
    })
    describe('Error response', () => {
      test("Because role who want to create isn't admin", done => {
        request(app)
          .post('/students')
          .set('token', tokent)
          .send({
            name: 'student',
            ClassId,
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test("Because student name is empty", done => {
        request(app)
          .post('/students')
          .set('token', token)
          .send({
            name: '',
            ClassId,
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe("Student name cannot be empty")
            done()
          })
      })
      test("Because parent is empty", done => {
        request(app)
          .post('/students')
          .set('token', token)
          .send({
            name: 'student',
            ClassId,
            ParentId: null
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe("Parent cannot be empty")
            done()
          })
      })
      test("Because class is empty", done => {
        request(app)
          .post('/students')
          .set('token', token)
          .send({
            name: 'student',
            ClassId: null,
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe("Class cannot be empty")
            done()
          })
      })
    })
  })
  describe('Get all students sections', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and list students', done => {
        request(app)
          .get('/students')
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
  describe('Update data student sections', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .put('/students/' + id)
          .set('token', token)
          .send({
            name: 'student',
            class: 'IX 2',
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success update data student')
            done()
          })
      })
    })
    describe('Error response', () => {
      test("Because role isn't admin", done => {
        request(app)
          .put('/students/' + id)
          .set('token', tokent)
          .send({
            name: 'student',
            ClassId,
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test("Because student name is empty", done => {
        request(app)
          .put('/students/' + id)
          .set('token', token)
          .send({
            name: '',
            ClassId,
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe("Student name cannot be empty")
            done()
          })
      })
      test("Because parent is empty", done => {
        request(app)
          .put('/students/' + id)
          .set('token', token)
          .send({
            name: 'student',
            ClassId,
            ParentId: null
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe("Parent cannot be empty")
            done()
          })
      })
      test("Because class is empty", done => {
        request(app)
          .put('/students/' + id)
          .set('token', token)
          .send({
            name: 'studentsss',
            ClassId: null,
            ParentId
          })
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(400)
            expect(body.message).toBe("Class cannot be empty")
            done()
          })
      })
    })
  })
  describe('Delete data student sections', () => {
    describe('Error response', () => {
      test.skip("Because role isn't admin", done => {
        request(app)
          .delete('/students/' + id)
          .set('token', tokent)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(403)
            expect(body.message).toBe('Only admin can do this action')
            done()
          })
      })
      test.skip("Because students doesnt exist", done => {
        request(app)
          .delete('/students/' + 100)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(404)
            expect(body.message).toBe('Student data not found')
            done()
          })
      })
    })
    describe('Success response', () => {
      test('Will returning status code 200 and message', done => {
        request(app)
          .delete('/students/' + id)
          .set('token', token)
          .end((err, { status, body }) => {
            expect(err).toBeNull()
            expect(status).toBe(200)
            expect(body.message).toBe('Success delete data student')
            done()
          })
      })
    })
  })
})