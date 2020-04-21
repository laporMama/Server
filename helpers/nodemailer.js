const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'lapormama@gmail.com',
        pass: 'lapormama206'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter