const { Attendance } = require('../models')

module.exports = {
  isAdmin(req, res, next) {
    const { role } = req.decoded
    if (role === 'admin') {
      next()
    } else {
      next({
        status: 403,
        message: 'Only admin can do this action'
      })
    }
  },
  isTeacher(req, res, next) {
    const { role } = req.decoded
    if (role === 'teacher') {
      next()
    } else {
      next({
        status: 403,
        message: 'Only teacher can do this action'
      })
    }
  },
  isToday(req, res, next) {
    Attendance.findOne({
      where: { attendanceDate: new Date().toLocaleDateString() }
    })
      .then(data => {/* istanbul ignore next */
        if (data) {
          req.headers.AttendanceId = data.id
          next()
        } else {
        /* istanbul ignore next line */  Attendance.create({
          attendanceDate: new Date().toLocaleDateString()
        })
            .then(data => {
              req.headers.AttendanceId = data.id
              next()
            })
        }
      })
      .catch(next)
  }
};
