const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
let token = ''
let tokent = ''

describe('Create students section, only user who have role "admin" can do this action', () => {
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
    test('Create Student', done => {
      request(app) 
        .post('/students')
        .set('token', token)
        .send({
          name: 'student',
          class: 'IX 1',
          parentEmail: 'parent@mail.com'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(201)
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
          class: 'IX 1',
          parentEmail: 'parent@mail.com'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(403)
          expect(body.message).toBe('Only admin can do this action')
          done()
        })
    })
    test("Because parent email doesn't exist", done => {
      request(app)
        .post('/students')
        .set('token', token)
        .send({
          name: 'student',
          class: 'IX 1',
          parentEmail: 'parentparent@mail.com'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(404)
          expect(body.message).toBe("parentparent@mail.com doesn't exist")
          // ^ <input email> doesn't exist
          done()
        })
    })
    test("Because class doesn't exist", done => {
      request(app)
        .post('/students')
        .set('token', token)
        .send({
          name: 'student',
          class: 'IX 99',
          parentEmail: 'parent@mail.com'
        })
        .end((err, { status, body }) => {
          expect(err).toBeNull()
          expect(status).toBe(404)
          expect(body.message).toBe("Class IX99 doesn't exist")
          // ^ Class <input class> doesn't exist
          done()
        })
    })
  })
})