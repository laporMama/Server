const router = require('express').Router();
const login = require('./login.js')
const attendances = require('./attendances.js')
const register = require('./register.js')
const reports = require('./reports.js')
const students = require('./students.js')
const teachers = require('./teachers.js')
const classes = require('./classes.js')
const isLogin = require('../middlewares/authentication.js')
const { isAdmin } = require('../middlewares/authorization.js')

const { Student, StudentAttendance, Attendace } = require('../models')
router.get('/test', async (req, res, next) => {
	try {
		const students = await Student.findAll({
      where: { ParentId: id }
    })

    const attendance = await Promise.all(students.map(async student => {
      const conj = await StudentAttendance.findOne({
        where: { id: student.id },
        include: {
          model: Attendance,
          where: { attendanceDate:  }
        }
      })
		}))
		res.send('test page');
	} catch (error) {
		res.send('test page error');
	}
})

router.use('/', login)
router.use(isLogin)
router.use('/class', classes)
router.use('/reports', reports)
router.use('/attendances', attendances)
router.use('/teachers', teachers)
router.use('/students', students)
router.use(isAdmin)
router.use('/register', register)

module.exports = router