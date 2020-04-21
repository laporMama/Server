const { Report, Teacher, Student, Class, Course } = require('../models');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

class ReportController {
  static async getAll(req, res, next) {
    const dataRedis = await getRedis('report')
    if(dataRedis){
      res.status(200).json({
        data: dataRedis
      })
    }else{
      Report.findAll()
        .then(data => {
          setRedis('report', data)
          res.status(200).json({
            data
          })
        })
        .catch(next)
    }
  }
  static async setScore(req, res, next) {
    try {
      const {
        score,
        reportDate,
        type,
        StudentId,
        CourseId
      } = req.body;
      if (reportDate === null || reportDate === '') {
        next({
          status: 400,
          message: 'Report date cannot be empty'
        })
      }
      const report = await Report.create({
        score: Number(score),
        reportDate: new Date(reportDate).toLocaleString(),
        type,
        StudentId,
        CourseId
      });
      const _ = await deleteRedis('report')
      res.status(201).json({
        message: 'Success create student report'
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateScore(req, res, next) {
    const { id } = req.params;
    const { score } = req.body;

    try {
      const updatedCount = await Report.update({ score }, {
        where: { id }
      })
      if (updatedCount[0] === 0) {
        throw {
          status: 404,
          message: 'Report data not found'
        }
      } else {
        const _ = await deleteRedis('report')
        res.status(200).json({
          message: 'Success update student report'
        })
      }
    } catch (error) {
      next(error)
    }
  }
  static async deleteScore(req, res, next) {
    const { id } = req.params;
    try {
      const deletedCount = await Report.destroy({
        where: { id }
      })
      if (deletedCount === 0) {
        throw {
          status: 404,
          message: 'Report data not found'
        }
      } else {
        const _ = await deleteRedis('report')
        res.status(200).json({
          message: 'Success delete student report'
        })
      }
    } catch (error) {
      next(error)
    }
  }
  static findByParent(req, res, next) {
    const { id } = req.decoded
    Student.findAll({
      where: { ParentId: id },
      include: [Report]
    })
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }
}

module.exports = ReportController;