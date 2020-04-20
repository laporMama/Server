const request = require('supertest')
const app = require('../app.js')
const { User, Class, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers')
let token = ''
let tokent = ''
let id = 0

describe('/class sections, only user who have role "admin" can do this action', () => {
  beforeAll(done => {
	const admin = {
	  name: 'admin',
	  email: 'admin@mail.com',
	  password: '12345',
	  role: 'admin',
	  phoneNumber: '081234432180'
	}
	const dummy = {
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

			return Class.create({
				name: 'XII-1'
			})
		})
		.then(result => {
			id = result.id

			done()
		})
	  .catch(done)
  })
  afterAll(done => {
		queryInterface.bulkDelete('Users', null, {})
			.then(_ => {
				done()
			})
			.catch(done)
  })

  describe('Create class section', () => {
		describe('Success response', () => {
			test('Will returning status code 201 and message', done => {
				request(app)
					.post('/class')
					.set('token', token)
					.send({
						name: 'IX-1'
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(201)
						expect(body.message).toBe('Success create class')
						done()
					})
				})
		})
		describe('Error responses', () => {
			test("because user role isn't admin", done => {
				request(app)
					.post('/class')
					.set('token', tokent)
					.send({
						name: 'IX-1'
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(403)
						expect(body.message).toBe('Only admin can do this action')
						done()
					})
			})

			test("because name is null", done => {
				request(app)
					.post('/class')
					.set('token', token)
					.send({
						name: null
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(400)
						expect(body.message).toBe('Class name cannot be null')
						done()
					})
			})

			test("because name is empty", done => {
				request(app)
					.post('/class')
					.set('token', token)
					.send({
						name: ''
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(400)
						expect(body.message).toBe('Class name cannot be empty')
						done()
					})
			})
		})
	})

	describe('Get class section', () => {
		describe('Success response', () => {
			test('Will returning status code 200 and class data', done => {
				request(app)
					.get('/class')
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

	describe('Update class section', () => {
		describe('Success response', () => {
			test('Will returning status code 200 and message', done => {
				request(app)
					.put('/class/' + id)
					.set('token', token)
					.send({
						name: 'IX-5'
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(200)
						expect(body.message).toBe('Success update class')
						done()
					})
				})
		})
		describe('Error responses', () => {
			test("because user role isn't admin", done => {
				request(app)
					.put('/class/' + id)
					.set('token', tokent)
					.send({
						name: 'IX-5'
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(403)
						expect(body.message).toBe('Only admin can do this action')
						done()
					})
			})

			test("because id not found", done => {
				request(app)
					.put('/class/' + 0)
					.set('token', token)
					.send({
						name: 'IX-5'
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(404)
						expect(body.message).toBe('Class not found')
						done()
					})
			})

			test("because name is null", done => {
				request(app)
					.put('/class/' + id)
					.set('token', token)
					.send({
						name: null
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(400)
						expect(body.message).toBe('Class name cannot be null')
						done()
					})
			})

			test("because name is empty", done => {
				request(app)
					.put('/class/' + id)
					.set('token', token)
					.send({
						name: ''
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(400)
						expect(body.message).toBe('Class name cannot be empty')
						done()
					})
			})
		})
	})

	describe('Delete class section', () => {
		describe('Success response', () => {
			test('Will returning status code 200 and message', done => {
				request(app)
					.delete('/class/' + id)
					.set('token', token)
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(200)
						expect(body.message).toBe('Success delete class')
						done()
					})
				})
		})
		describe('Error responses', () => {
			test("because user role isn't admin", done => {
				request(app)
					.delete('/class/' + id)
					.set('token', tokent)
					.send({
						name: 'IX-5'
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(403)
						expect(body.message).toBe('Only admin can do this action')
						done()
					})
			})

			test("because id not found", done => {
				request(app)
					.delete('/class/' + 0)
					.set('token', token)
					.send({
						name: 'IX-5'
					})
					.end((err, { status, body }) => {
						expect(err).toBeNull()
						expect(status).toBe(404)
						expect(body.message).toBe('Class not found')
						done()
					})
			})
		})
	})
})
