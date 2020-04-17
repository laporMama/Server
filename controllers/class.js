const { Class } = require('../models');

class ClassesController {
  static async getAll (req, res, next) {
    try {
      const classes = await Class.findAll();
  
      res.status(200).json({
        classes
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClassesController;