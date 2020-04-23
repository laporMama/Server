const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword(input, password) {
    return bcrypt.compareSync(input, password)
  },
  generateToken(payload) {
    return jwt.sign(payload, process.env.KEY)
  },
  verify(token) {
    return jwt.verify(token, process.env.KEY)
  },
  async getRedis(name) {
    try {
      const data = await redis.get(name)
      return JSON.parse(data)
    } catch (error) { /* istanbul ignore next line */
      next(error)
    }
  },
  async setRedis(name, payload) {
    try {
      await redis.set(name, JSON.stringify(payload))
    } catch (error) { /* istanbul ignore next line */
      next(error)
    }
  },
  async deleteRedis(name) {
    try {
      await redis.del(name)
    } catch (error) { /* istanbul ignore next line */
      next(error)
    }
  }
}