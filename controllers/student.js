const { Student, Report } = require('../models/');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

class StudentController {
  static getAll(req, res, next) {
    const dataRedis = getRedis('student')
    if(dataRedis){
      res.status(200).json({
        data: dataRedis
      })
    }else{
      Student.findAll()
        .then(data => {
          setRedis('student', data)
          res.status(200).json({
            data
          })
        })
        .catch(next)
    }
  }
  static async getById(req, res, next) {/* istanbul ignore next line */
    try {/* istanbul ignore next line */
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
  static async getByClassId(req, res, next) {/* istanbul ignore next line */
    try {/* istanbul ignore next line */
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
  static async getChildren(req, res, next) {/* istanbul ignore next line */
    try {/* istanbul ignore next line */
      const { id } = req.decoded

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
      const student = await Student.destroy({
        where: { id }
      })
      const _ = await deleteRedis('student')
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
      const _ = await deleteRedis('student')
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
        deleteRedis('student')
        res.status(201).json({
          message: `Success create ${name} as student`
        })
      })
      .catch(next)
  }
}

module.exports = StudentController