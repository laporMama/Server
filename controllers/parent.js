const { User } = require('../models');

class ParentController {
  static async getAll (req, res, next) {
    const parents = await User.findAll({
      where: {
        role: 'parent'
      }
    })

    res.status(200).json({
      parents
    })
  }
  static async getById (req, res, next) {
    const { id } = req.params;

    const parent = await User.findOne({
      where: { id }
    })

    res.status(200).json({
      parent
    })
  }
}

module.exports = ParentController;