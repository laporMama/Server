const { StudentAttendance, Student, Class} = require('../models')
// console.log(new Date().toLocaleDateString() === new Date('4/19/2020').toLocaleDateString())
module.exports = {
  create(req, res, next) {
    const { StudentId, status } = req.body
    const { AttendanceId } = req.headers
    StudentAttendance.create({
      status, StudentId, AttendanceId
    })
      .then(() => {
        res.status(201).json({
          message: 'Success create attendances'
        })
      })
      .catch(next)
  },
  findAll(req, res, next) {
    StudentAttendance.findAll()
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  },
  update(req, res, next) {
    const { status, StudentId } = req.body
    const { id } = req.params
    StudentAttendance.update({
      status, StudentId
    }, {
      where: { id }
    })
      .then(() => {
        res.status(200).json({
          message: 'Success update student attendance'
        })
      })
      .catch(next)
  },
  destroy(req, res, next) {
    const { id } = req.params
    StudentAttendance.destroy({
      where: { id }
    })
      .then(() => {
        res.status(200).json({
          message: 'Success delete data attendance'
        })
      })
      .catch(next)
  },
  findByParent(req, res, next) {
    const { id } = req.decoded
    Student.findAll({
      where: { ParentId: id },
      include: [{model:StudentAttendance},{model:Class}]
    })
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }
}