const { Class } = require('../models');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

class ClassesController {
  static async getAll(req, res, next) {
    const dataRedis = await getRedis('class')/* istanbul ignore next line */
    if (dataRedis) {
      res.status(200).json({
        data: dataRedis
      })
    }/* istanbul ignore next */ else {
      Class.findAll()
        .then(data => {
          setRedis('class', data)
          res.status(200).json({
            data
          })
        })
    }
  }
  static async create(req, res, next) {
    try {
      const { name } = req.body
      const created = await Class.create({ name })
      const _ = await deleteRedis('class')
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
      const _ = await deleteRedis('class')
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
      const _ = await deleteRedis('class')
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