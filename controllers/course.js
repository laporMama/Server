const { Course } = require('../models');

class CourseController {
  static async getAll(req, res, next) {
    try {
      const data = await Course.findAll();
      res.status(200).json({
        data
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { name } = req.body
      const course = await Course.create({
        name
      })
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
        res.status(200).json({
          message: 'Success delete course'
        })
      })
      .catch(next)
  }
}

module.exports = CourseController;