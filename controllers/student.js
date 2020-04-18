const { Student } = require('../models/');

class StudentController {
  static async getAll (req, res, next) {
    const students = await Student.findAll();

    res.status(200).json({
      students
    })
  }

  static async getById (req, res, next) {
    const { id } = req.params

    const student = await Student.findOne({
      where: { id }
    })

    res.status(200).json({
      student
    })
  }

  static async getByClassId (req, res, next) {
    const { ClassId } = req.params;

    const students = await Student.findAll({
      where: { ClassId }
    })

    res.status(200).json({
      students
    })
  }

  static async getChildren (req, res, next) {
    const { id: ParentId } = req.decoded

    const student = await Student.findAll({
      where: { ParentId }
    })
    
    res.status(200).json({
      student
    })
  }
}

module.exports = StudentController