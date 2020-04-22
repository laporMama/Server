const router = require('express').Router();
const moment = require('moment');
const { Op } = require('sequelize');
const { User, Student, StudentAttendance, Attendance } = require('../models');
const transporter = require('../helpers/nodemailer');
const nexmo = require('../helpers/nexmo');

moment.suppressDeprecationWarnings = true;

router.get('/sms/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const student = await Student.findOne({
			where: { id },
			include: [{
				model: User
			}, {
				model: StudentAttendance,
					where: { status: 'Hadir' },
					include: {
						model: Attendance,
						where: { attendanceDate: new Date().toLocaleDateString() }
					}
			}]
		})

	const { User: parent } = student;

	
		const from = 'Lapor Mama';
		const to = '+6281918564883';
		const text = `Hi ${parent.name}, We would like to notify that our student, ${student.name}, already attend the class today. Thank you, Lapor Mama`

    nexmo.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        throw err
      }

      if (responseData.messages[0]['status'] !== "0") {
        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
				throw `Message failed with error: ${responseData.messages[0]['error-text']}`
      }
      
      res.status(200).json({
				message: "Message sent successfully."
			});
		})
  } catch (error) {
		console.log(error);
    next(error)
  }
})

router.get('/email/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const student = await Student.findOne({
			where: { id },
			include: [{
				model: User
			}, {
				model: StudentAttendance,
					include: {
						model: Attendance,
						where: {
							attendanceDate: {
								[Op.gte]: moment().subtract(5, 'days').format('l'),
								[Op.lte]: new Date().toLocaleDateString()
							}
						}
					}
			}]
		})

		const { User: parent } = student;

		const body = {
			from: '"Lapor Mama" <lapormama@gmail.com>',
			to: 'adamjay041@gmail.com',
			// to: `${parent.name} <${parent.email}>`, // email dari database
			subject: 'Weekly Attendance Notification',
			html: `
			<html>
				<head>
					<style>
						table {
							border-collapse: collapse;
						}
					
						thead tr th {
							border: 1px solid black;
							padding: 10px;
						}
					
						tbody tr:nth-child(1) {
							border-right: 0 !important;
							padding: 10px;
						}
					
						tbody tr td {
							border: 1px solid black;
							padding: 10px;
						}
					</style>
				</head>
			<body>
				<h3>Hi ${parent.name}</h3>
				<p>We would like to notify you about our student, ${student.name}'s weekly attendance report:</p>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Attendance</th>
						</tr>
					</thead>
					<tbody>
						${
							student.StudentAttendances.map(conj => `
							<tr>
								<td>${moment(conj.Attendance.attendanceDate).format('dddd, DD MM YYYY')}</td>
								<td>${conj.status}</td>
							</tr>
							`).join('')
						}
					</tbody>
				</table>
				
				<style>
					table {
						border-collapse: collapse;
					}
				
					thead tr th {
						border: 1px solid black;
						padding: 10px;
					}
				
					tbody tr:nth-child(1) {
						border-right: 0 !important;
						padding: 10px;
					}
				
					tbody tr td {
						border: 1px solid black;
						padding: 10px;
					}
				</style>
				<p>Thank you,<br> Lapor Mama</p>
			</body>
		</html>`
		}

    const send = await transporter.sendMail(body)

		console.log(send);
    res.status(200).json({
			message: "Message sent successfully."
		});
  } catch (error) {
		console.log(error);
    next(error)
  }
})

module.exports = router