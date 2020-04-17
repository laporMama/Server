const { Course } = require('../models');

class CourseController {
  static async getAll (req, res, next) {
    try {
      const courses = await Course.findAll();
  
      res.status(200).json({
        courses
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById (req, res, next) {
    try {
      const { id } = req.params;
  
      const courses = await Course.findOne({
        where: { id }
      });
  
      res.status(200).json({
        courses
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CourseController;