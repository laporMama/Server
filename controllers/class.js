const { Class } = require('../models');

class ClassesController {
  static async getAll (req, res, next) {
    try {
      const classes = await Class.findAll();
  
      res.status(200).json({
        data: classes
      });
    } catch (error) {
      next(error);
    }
  }

  static async create (req, res, next) {
    try {
      const { name } = req.body

      const created = await Class.create({ name })

      res.status(201).json({
        message: 'Success create class'
      })
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body

      const updated = await Class.update({ name }, {
        where: { id }
      })

      if (updated[0] === 0) {
        throw {
          status: 404,
          message: 'Class not found'
        }
      } else {
        res.status(200).json({
          message: 'Success update class'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async destroy (req, res, next) {
    try {
      const { id } = req.params

      const deleted = await Class.destroy({
        where: { id }
      })

      if (deleted === 0) {
        throw {
          status: 404,
          message: 'Class not found'
        }
      } else {
        res.status(200).json({
          message: 'Success delete class'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ClassesController;