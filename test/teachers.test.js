const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
let token = ''
let tokent = ''

describe('Create teachers section, only user who have role "admin" can do this action', () => {
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
    const parent = {
      username: 'parent',
      email: 'parent@mail.com',
      password: '12345',
      role: 'parent',
      phoneNumber: '081234432180'
    }
    const dataAdmin = await User.create(admin)
    const dataDummy = await User.create(dummy)
    await User.create(parent)
    token = dataAdmin.token
    tokent = dataDummy.token
    done()
  })
  afterAll(async done => {
    await queryInterface.bulkDelete('Users', null, {})
    done()
  })

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
          expect(body.message).toBe('Success create budi as Matematika teacher')
          // ^ success create <username> as <course name> teacher
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
    test("Because teacher have same course", done => {
      request(app)
        .post('/teachers')
        .set('token', token)
        .send({
          email: 'budi@mail.com',
          course: 'Matematika'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(400)
          expect(body.message).toBe('Teacher budi already have matematika course')
          // ^ Teacher <teacher name> already have <course name> course
          done()
        })
    })
    test("Because role you want to register isn't teacher", done => {
      request(app)
        .post('/teachers')
        .set('token', token)
        .send({
          email: 'parent@mail.com',
          course: 'Matematika'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(400)
          expect(body.message).toBe("parent role isn't teacher")
          // ^ <name> role isn't teacher
          done()
        })
    })
    test("Because teacher email doesn't exist", done => {
      request(app)
        .post('/teachers')
        .set('token', token)
        .send({
          email: 'teacher@mail.com',
          course: 'Matematika'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(404)
          expect(body.message).toBe("teacher@mail.com doesn't exist")
          // ^ <registered email> doesn't exist
          done()
        })
    })
  })
})