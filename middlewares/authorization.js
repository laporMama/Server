const { Teacher, Parent } = require('../models')

module.exports = {
    TeacherAuthorization: (req, res, next) => {
      const id = req.UserId
      Teacher.findOne({
        where: { id }
      })
        .then(Teacher => {
          if (Teacher.subjectId === req.params.subjectId) {
            next()
          } else {
            next({ status: 401, message: 'You Are Not Authorized' })
          }
        })
        .catch(next)
    },
    ParentAuthorization: (req, res, next) => {
      const userId = req.UserId

      Parent.findOne({
        where: {
          id: userId
        }
      })
        .then(parent => {
          if (parent) {
            if (parent.UserId === userId) {
              next()
            } else {
              next({ status: 401, message: 'You Are Not Authorized' })
            }
          } else {
            next({ status: 404, message: 'Not Found' })
          }
        })
        .catch(next);
    }
};
