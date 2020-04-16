const Helper = require('../helpers/helper')
const { Teacher } = require('../models')

module.exports = (req, res, next) => {
  const { token } = req.headers;
  try {
    const decoded = Helper.verify(token)
    req.UserId = decoded.id
    Teacher.findOne({
      where: { id: req.UserId }
    })
      .then(Teacher => {
        if (Teacher) next()
        else next({ status: 401, message: `You Must Login / Register First` })
      })
      .catch(next)
  } catch (err) {
    next(err)
  }
};
