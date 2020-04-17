const { Parent } = require('../models');

class ParentController {
  static getParentById (req, res, next) {
    res.send('mama page');
  }
}

module.exports = ParentController;