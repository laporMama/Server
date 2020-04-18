const { Teacher, Parent } = require('../models')

module.exports = {
    AdminAuthorization: (req, res, next) => {
      // console.log('author masuk');
      const { role } = req.decoded

      if (role === 'admin') {
        next()
      } else {
        next({
          status: 401,
          message: 'Only admin can do this action!'
        })
      }
    },
    ParentAuthorization: (req, res, next) => {
      const { role } = req.decoded

      if (role === 'parent') {
        next()
      } else {
        next({
          status: 401,
          message: 'Only parent can do this action'
        })
      }
    },
    TeacherAuthorization: (req, res, next) => {
      // console.log('author masuk');
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
