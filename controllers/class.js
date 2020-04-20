const { Class } = require('../models');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

class ClassesController {
  static async getAll(req, res, next) {
    try {
      const data = await getRedis('class')
      if (data) {
        console.log(data)
        res.status(200).json({
          data
        });
      } else {
        const classes = await Class.findAll();
        const _ = await setRedis('class', classes)
        res.status(200).json({
          data: classes
        });
      }
    } catch (error) {/* istanbul ignore next line */
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name } = req.body
      const created = await Class.create({ name })
      const _ = deleteRedis('class')
      res.status(201).json({
        message: 'Success create class'
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body
      const updated = await Class.update({ name }, {
        where: { id }
      })
      deleteRedis('class')
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

  static async destroy(req, res, next) {
    try {
      const { id } = req.params
      const deleted = await Class.destroy({
        where: { id }
      })
      deleteRedis('class')
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