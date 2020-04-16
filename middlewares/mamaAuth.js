const { Parent } = require('../models');

module.exports = (req, res, next) => {
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
};