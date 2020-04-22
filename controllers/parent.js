const { User } = require('../models')

module.exports = {
  findAll(req, res, next) {
    User.findAll({
      where: { role: 'parent' }
    })
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }
}