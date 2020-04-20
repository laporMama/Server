const { Report, Teacher, Student, Class, Course } = require('../models');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

class ReportController {
  static async getAll(req, res, next) {
    try {
      // const dataRedis = await getRedis('report')
      // console.log(dataRedis)
      // if (dataRedis) {
      //   res.status(200).json({
      //     data: dataRedis
      //   })
      // } else {
        const data = await Report.findAll()
          // const _ = await setRedis('report', data)
          res.status(200).json({
            data
          })
      // }
    } catch (error) {
      next(error)
    }
    // try {
    //   let result = null;
    //   const { role } = req.decoded;
    //   const { id: UserId } = req.decoded;
    //   /* istanbul ignore next */
    //   if (role === 'teacher' || role === 'admin') {
    //     const { CourseId } = await Teacher.findOne({
    //       where: { UserId }
    //     });

    //     //#region versi 1
    //     // result = await Class.findAll({
    //     //   include: [{
    //     //     model: Student,
    //     //     include: {
    //     //       model: Report,
    //     //       where: {
    //     //         id: CourseId
    //     //       }
    //     //     }
    //     //   }]
    //     // })
    //     //#endregion

    //     result = await Report.findAll({
    //       where: { CourseId },
    //       include: [Course]
    //     })
    //   } /* istanbul ignore next line */else if (role === 'parent') {/* istanbul ignore next line */
    //     const childrens = await Student.findAll({/* istanbul ignore next line */
    //       where: { ParentId: UserId }
    //     })
    //     /* istanbul ignore next line */
    //     let ids = childrens.map(children => children.id)/* istanbul ignore next line */
    //     result = await Report.findAll({
    //       where: { id: ids },
    //       include: [Course]
    //     })

    //     //#region versi 1
    //     // await Promise.all(childrens.map(async children => {
    //     //   let courses = await Course.findAll({
    //     //     include: {
    //     //       model: Report,
    //     //       where: {
    //     //         StudentId: children.id
    //     //       }
    //     //     }
    //     //   })

    //     //   courses = courses.map(course => course.dataValues)

    //     //   return {
    //     //     ...children.dataValues,
    //     //     Courses: courses
    //     //   };
    //     // }))
    //     //   .then(results => {
    //     //     result = results
    //     //   })
    //     //   .catch(err => {
    //     //     throw err;
    //     //   })
    //     //#endregion
    //   }

    //   res.status(200).json({
    //     data: result
    //   });
    // } catch (error) {/* istanbul ignore next line */
    //   next(error);
    // }
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
        const _ = deleteRedis('report')
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
        const_ =deleteRedis('report')
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