const { Teacher } = require('../models')

module.exports = (req, res, next) => {
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
};
