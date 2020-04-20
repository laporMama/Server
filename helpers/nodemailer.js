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

const sendMail = (parentName, parentEmail, subject, html, callback) => {
	const body = {
		from: 'Lapor Mama <lapormama@gmail.com>',
		to: `${parentName} <${parentEmail}>`,
		subject,
		html
	}

	transporter.sendMail(body, (error, info) => {
		if (error) callback(error, null);
		else callback(null, info);
	})
}


module.exports = sendMail