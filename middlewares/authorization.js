const { Teacher, Parent } = require('../models')

module.exports = {
    AdminAuthorization: (req, res, next) => {
      console.log('author masuk');
      console.log(req.decoded);
      const { role } = req.decoded

      if (role === 'admin') {
        next()
      } else {
        next({
          status: 401,
          message: 'Not authorized!'
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
          message: 'Not authorized!'
        })
      }
    },
    TeacherAuthorization: (req, res, next) => {
      const { role } = req.decoded

      if (role === 'teacher') {
        next()
      } else {
        next({
          status: 401,
          message: 'Not authorized!'
        })
      }
    }
};
