const Bull = require('bull');
const sendMailer = require('../helpers/nodemailer');
const { Student, StudentAttendance, Attendance } = require('../models');

const sendDailyAttendanceQueue = new Bull('queue-daily');
const sendWeeklyAttendanceQueue = new Bull('queue-weekly');

sendDailyAttendanceQueue.process(async (job) => {
  const { id } = job.data

  try {
    const students = await Student.findAll({
      where: { ParentId: id }
    })

    // const attendance = await Promise.all(students.map(async student => {
    //   const conj = await StudentAttendance.findOne({
    //     where: { id: student.id },
    //     include: {
    //       model: Attendance,
    //       where: { attendanceDate:  }
    //     }
    //   })
    // }))

    sendMailer(
      name,
      email,
      'Daily Attendance Notification',
      `<h1>test</h1>`,
      (err, response) => {
        if (err) throw err
        if (response) return { response }
      }
    )
  } catch (err) {
    return Promise.reject({ err })
  }

  
})

sendWeeklyAttendanceQueue.process((job) => {
  sendMailer(
    'abc',
    'ryanmaulanaputra@gmail.com',
    'testsubject',
    `<h1>test</h1>`,
    (err, response) => {
      if (err) return Promise.reject({ err })
      if (response) return { response }
    }
  )
})

sendDailyAttendanceQueue.on('completed', (job, result) => {
  console.log(result.response);
})

sendDailyAttendanceQueue.on('failed', (job, result) => {
  console.log(result.err);
})

sendWeeklyAttendanceQueue.on('completed', (job, result) => {
  console.log(result.response);
})

sendWeeklyAttendanceQueue.on('failed', (job, result) => {
  console.log(result.err);
})

function queueDailyEmail (id) {
  sendEmailQueue.add({ id }, {
    repeat: {
      cron: '0 8 * * 1-5',
      limit: 1
    },
    attemps: 4,
    backoff: 60 * 60 * 1000
  })
}

function queueWeeklyEmail (id) {
  sendEmailQueue.add({ id }, {
    repeat: {
      cron: '0 10 * * 5',
      limit: 1
    },
    attemps: 4,
    backoff: 60 * 60 * 1000
  })
}

module.exports = { queueDailyEmail, queueWeeklyEmail }