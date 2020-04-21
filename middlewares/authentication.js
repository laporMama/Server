const { User } = require('../models')
const { verify } = require('../helpers/helper.js')

module.exports = (req, res, next) => {
  let { token } = req.headers;
  try {
    const payload = verify(token);
    let { id, email } = payload;
    User.findOne({
      where: { id, email }
    })
      .then(data => {
        if (data) {
          req.decoded = data;
          next();
        } else {
          next({
            status: 401,
            message: 'Please Log in first'
          })
        }

        return null
      })
      .catch(next)
  } catch (error) {
    next(error)
  }
};
