const { User } = require('../models')
const { verify } = require('../helpers/helper.js')

module.exports = (req, res, next) => {
  let { token } = req.headers;

  let payload = {};

  try {
      payload = verify(token);
  } catch (error) {
      next(error)
  }

  let { id, email } = payload;

  User.findOne({
    where: { id, email }
  })
    .then(result => {
      if (result) {
        req.decoded = payload;
        next();
      } else {
        next({
          status: 400,
          message: 'Please Log in'
        })
      }

      return null
    })
    .catch(next)
};
