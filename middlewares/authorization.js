const { Teacher, Parent } = require('../models')

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
  }
};
