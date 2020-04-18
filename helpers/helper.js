const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Helper = {
  hashPassword: (password) =>  {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword: (input, password) => {
    return bcrypt.compareSync(input, password)
  },
  generateToken: (payload) => {
    console.log(payload)
    return jwt.sign(payload, process.env.KEY)
  },
  verify: (token) => {
    return jwt.verify(token, process.env.KEY)
  }
}

module.exports = Helper