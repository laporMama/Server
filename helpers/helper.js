const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Helper{
    static hashPassword(password){
        return bcrypt.hashSync(password, 10)
    }
    static comparePassword(input, password){
        return bcrypt.compareSync(input, password)
    }
    static generateToken(payload){
        return jwt.sign(payload, process.env.KEY)
    }
    static verify(token){
        return jwt.verify(token, process.env.KEY)
    }
}

module.exports = Helper