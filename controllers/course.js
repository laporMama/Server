const { Course } = require('../models');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

class CourseController {
  static async getAll(req, res, next) {
    try {
      const dataRedis = await getRedis('course')/* istanbul ignore next */
      if (dataRedis) {
        res.status(200).json({
          data: dataRedis
        });
      } else {
        const data = await Course.findAll();
        const _ = await setRedis('course', data)
        res.status(200).json({
          data
        });
      }
    } catch (error) {/* istanbul ignore next */
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { name } = req.body
      const course = await Course.create({
        name
      })
      const _ = await deleteRedis('course')
      res.status(201).json({
        message: 'Success create course'
      })
    } catch (error) {
      next(error)
    }
  }
  static update(req, res, next) {
    const { id } = req.params
    const { name } = req.body
    Course.update({
      name
    }, {
      where: { id }
    })
      .then(() => {
        deleteRedis('course')
        res.status(200).json({
          message: 'Success update course'
        })
      })
      .catch(next)
  }
  static destroy(req, res, next) {
    const { id } = req.params
    Course.destroy({
      where: { id }
    })
      .then(() => {
        deleteRedis('course')
        res.status(200).json({
          message: 'Success delete course'
        })
      })
      .catch(next)
  }
}

module.exports = CourseController;