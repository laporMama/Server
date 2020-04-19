const { Student } = require('../models/');

class StudentController {
  static async getAll(req, res, next) {
    try {
      const students = await Student.findAll();

      res.status(200).json({
        students
      })
    } catch (error) {
      next(error)
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params

      const student = await Student.findOne({
        where: { id }
      })

      res.status(200).json({
        student
      })
    } catch (error) {
      next(error)
    }
  }

  static async getByClassId(req, res, next) {
    try {
      const { id } = req.params;

      const students = await Student.findAll({
        where: { ClassId: id }
      })

      res.status(200).json({
        students
      })
    } catch (error) {
      next(error)
    }
  }

  static async getChildren(req, res, next) {
    try {
      const { id: ParentId } = req.decoded

      const student = await Student.findAll({
        where: { ParentId }
      })

      res.status(200).json({
        student
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteId(req, res, next) {
    try {
      const { id } = req.params

      const _ = await Student.destroy({
        where: { id }
      })

      res.status(200).json({
        msg: "delete Success"
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateId(req, res, next) {
    try {
      const { name, ClassId, ParentId } = req.body
      const { id } = req.params

      const student = await Student.updateId({
        where: {
          id
        }
      },
        {
          name,
          ClassId,
          ParentId
        })

      res.status(200).json(student)

    } catch (error) {
      next(error)
    }
  }
  static create(req, res, next){}
}

module.exports = StudentController