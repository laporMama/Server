const { User } = require('../models')
const { verify } = require('../helpers/index.js')

module.exports = (req, res, next) => {
  let { token } = req.headers;
  try {
    const payload = verify(token);
    let { id, email } = payload;
    User.findOne({
      where: { id, email }
    })
      .then(data => {
      /* istanbul ignore next */  if (data) {
          req.decoded = data;
          next();
        } else {
        /* istanbul ignore next line */  next({
          status: 401,
          message: 'Please Log in first'
        })
        }

        return null
      })
      .catch(next)
  } catch (error) {/* istanbul ignore next line */
    next(error)
  }
};
