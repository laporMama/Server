const { Report, Teacher, Student, Class, Course } = require('../models');

class ReportController {
  static async getAll (req, res, next) {
    try {
      let result = null;
      const { role } = req.decoded;
      const { id: UserId } = req.decoded;

      if (role === 'teacher' || role === 'admin') {
        const { CourseId } = await Teacher.findOne({
          where: { UserId }
        });

        //#region versi 1
        // result = await Class.findAll({
        //   include: [{
        //     model: Student,
        //     include: {
        //       model: Report,
        //       where: {
        //         id: CourseId
        //       }
        //     }
        //   }]
        // })
        //#endregion
         
        result = await Report.findAll({
          where: { CourseId }
        })
      } else if (role === 'parent') {
        const childrens = await Student.findAll({
            where: { ParentId: UserId }
        })

        let ids = childrens.map(children => children.id)
        result = await Report.findAll({
          where: { id: ids }
        })

        //#region versi 1
        // await Promise.all(childrens.map(async children => {
        //   let courses = await Course.findAll({
        //     include: {
        //       model: Report,
        //       where: {
        //         StudentId: children.id
        //       }
        //     }
        //   })

        //   courses = courses.map(course => course.dataValues)

        //   return {
        //     ...children.dataValues,
        //     Courses: courses
        //   };
        // }))
        //   .then(results => {
        //     result = results
        //   })
        //   .catch(err => {
        //     throw err;
        //   })
        //#endregion
      }

      res.status(200).json({
        data: result
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async setScore (req, res, next) {
    try {
      const {
        score,
        reportDate,
        type,
        StudentId,
        CourseId
      } = req.body;

      const report = await Report.create({
        score: Number(score),
        reportDate,
        type,
        StudentId,
        CourseId
      });

      res.status(201).json({
        message: 'Success create student report'
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateScore (req, res, next) {
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
        res.status(200).json({
          message: 'Success update student report'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteScore (req, res, next) {
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
        res.status(200).json({
          message: 'Success delete student report'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ReportController;