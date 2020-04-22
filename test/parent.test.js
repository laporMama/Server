const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers')
let token = ''
let tokent = ''

describe("/parent section, only admin can do this action", () => {
  beforeAll(done => {
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
    User.create(teacher)
      .then(data => {
        tokent = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        return User.create(parent)
      })
      .then(() => {
        return User.create(admin)
      })
      .then(data => {
        token = generateToken({
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
  describe('Find all teacher section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and data', done => {
        request(app)
          .get('/parent')
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
      test("Because role isn't admin", done => {
        request(app)
          .get('/parent')
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
})