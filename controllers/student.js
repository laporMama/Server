const { Student, Report } = require('../models/');

class StudentController {
  static async getAll(req, res, next) {
    try {
      const students = await Student.findAll();

      res.status(200).json({
        data: students
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
        where: { ClassId: id },
        include:[Report]
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
      const { id } = req.decoded
      console.log(id, 'OWKDAOKDOADKOKD')

      const student = await Student.findAll({
        where: { ParentId : id },
        include:[Report]
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
        message: "Success delete data student"
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateId(req, res, next) {
    try {
      const { name, ClassId, ParentId } = req.body
      const { id } = req.params
      const student = await Student.update({
        name,
        ClassId,
        ParentId
      }, {
        where: {
          id
        }
      })

      res.status(200).json({
        message: 'Success update data student'
      })

    } catch (error) {
      next(error)
    }
  }
  static create(req, res, next) {
    const { name, ClassId, ParentId } = req.body
    Student.create({
      name, ClassId, ParentId
    })
      .then(() => {
        res.status(201).json({
          message: `Success create ${name} as student`
        })
      })
      .catch(next)
  }
}

module.exports = StudentController