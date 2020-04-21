const Bull = require('bull');
const moment = require('moment');
const { Op } = require('sequelize');
const transporter = require('../helpers/nodemailer');

//#region send mail
const queueSendMail = new Bull('queue-send-mail');

queueSendMail.on('completed', (job, result) => {
  console.log('sending mail complete');
})

queueSendMail.on('failed', (job, result) => {
  console.log('sending mail failed', result);
})

queueSendMail.process(async (job) => {
  try {
    const send = await transporter.sendMail(job.data.body)

    return { response: send }
  } catch (error) {
    return Promise.reject({ error })
  }
})

function addToQueueSendMail (body) {
  queueSendMail.add({ body }, {
    attemps: 4,
    backoff: 60 * 60 * 1000
  })
}
//#endregion

//#region Daily Cron
const cronQueueDaily = new Bull('cron-daily')

function addDailyCron () {
  console.log(`adding cron to queue`);
  cronQueueDaily.add({}, {
    repeat: {
      // cron: '0 8 * * 1-5', // setiap hari senin - jumat setiap jam 8 pagi
      cron: '*/1 * * * *' // setiap 1 menit
    }
  })
}

cronQueueDaily.process(async (job) => {
  console.log(`fetch parents data`);
  try {
    const { User, Student, StudentAttendance, Attendance } = require('../models/index');
    console.log(`fetch parents data`);
    const parents = await User.findAll({
      where: { role: 'parent' },
      include: {
        model: Student,
        include: {
          model: StudentAttendance,
          where: { status: 'Hadir' },
          include: {
            model: Attendance,
            where: { attendanceDate: new Date().toLocaleDateString() }
          }
        }
      }
    })
    
    parents.forEach(parent => {
      const { Students: students } = parent
      
      students.forEach(student => {
        // to: `${parent.name} <${parent.email}>`, // email dari database
        const body = {
          from: '"Lapor Mama" <lapormama@gmail.com>',
          to: 'ryanmaulanaputra@gmail.com',
          subject: 'Daily Attendance Notification',
          html: `<h3>Hi ${parent.name}</h3>
          <p>We would like to notify that our student, ${student.name}, already attend the class today</p>
          <p>Thank you,<br> Lapor Mama</p>`
        }

        console.log(`sending mail of ${student.name}`);
        addToQueueSendMail({ body })
      })
    })

    return { response: 'berhasil'}
  } catch (error) {
    return Promise.reject({ error })
  }
})

cronQueueDaily.on('completed', (job, result) => {
  console.log('queueing cron completed');
})

cronQueueDaily.on('failed', (job, result) => {
  console.log('queueing cron failed', result.error);
})

//#endregion

//#region Weekly Cron
const cronQueueWeekly = new Bull('cron-weekly')

function addWeeklyCron () {
  console.log(`adding cron to queue`);

  cronQueueWeekly.add({}, {
    repeat: {
      // cron: '0 8 * * 1-5', // setiap hari senin - jumat setiap jam 8 pagi
      cron: '*/30 * * * * *' // setiap 1 menit
    }
  })
}

cronQueueWeekly.process(async (job) => {
  console.log(`fetch parents data`);
  
  try {
    const { User, Student, StudentAttendance, Attendance } = require('../models/index');
    console.log(`fetch parents data`);
    const parents = await User.findAll({
      where: { role: 'parent' },
      include: {
        model: Student,
        include: {
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
        }
      }
    })
    
    parents.forEach(parent => {
      const { Students: students } = parent
        console.log(`loop parent`);
        students.forEach(student => {
          // to: `${parent.name} <${parent.email}>`, // email dari database
          const body = {
            from: '"Lapor Mama" <lapormama@gmail.com>',
            to: 'ryanmaulanaputra@gmail.com',
            subject: 'Daily Attendance Notification',
            html: `
            <h3>Hi ${parent.name}</h3>
            <p>We would like to notify you about our student, ${student.name}'s weekly attendance report:</p>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>attendance</th>
                </tr>
              </thead>
              <tbody>
                ${
                  student.StudentAttendances.map(conj => `
                  <tr>
                    <td>${conj.Attendance.attendanceDate}</td>
                    <td>${conj.status}</td>
                  </tr>
                  `)
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
            <p>Thank you,<br> Lapor Mama</p>`
          }
  
          console.log(`sending mail of ${student.name}`);
          addToQueueSendMail({ body })
        })
    })

    return { response: 'berhasil'}
  } catch (error) {
    return Promise.reject({ error })
  }
})

cronQueueWeekly.on('completed', (job, result) => {
  console.log('queueing cron completed');
})

cronQueueWeekly.on('failed', (job, result) => {
  console.log('queueing cron failed', result.error);
})
//#endregion



module.exports = { addDailyCron, addWeeklyCron }