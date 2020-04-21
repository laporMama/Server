
const { StudentAttendance, Student, Class } = require('../models')
const { getRedis, setRedis, deleteRedis } = require('../helpers')

module.exports = {
  create(req, res, next) {
    const { data } = req.body
    const { AttendanceId } = req.headers
    let promiseAll = []
    data.forEach(el => {
      promiseAll.push(StudentAttendance.create({
        status: el.type, StudentId: el.id, AttendanceId
      }))
      Promise.all(promiseAll)
      .then(data => {
        res.status(200).json({
          message: 'Attendance Success'
        })
      })
      .catch(err => {
        next(err)
      })
    })
  },
  async findAll (req, res, next) {
    try {
      const dataRedis = await getRedis('attendances')
      if (dataRedis) {
        res.status(200).json({
          data: dataRedis
        })
      } else {
        const data = await StudentAttendance.findAll()
        const _ = await setRedis('attendances', data)
        res.status(200).json({
          data
        })
      }
    } catch (error) {
      next(error)
    }
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
        deleteRedis('attendances')
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
        deleteRedis('attendances')
        res.status(200).json({
          message: 'Success delete data attendance'
        })
      })
      .catch(next)
  },
  findByParent(req, res, next) {/* istanbul ignore next */
    const { id } = req.decoded/* istanbul ignore next */
    Student.findAll({
      where: { ParentId: id },

      include: [StudentAttendance, Class]
    })/* istanbul ignore next */
      .then(data => {/* istanbul ignore next */
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }
}