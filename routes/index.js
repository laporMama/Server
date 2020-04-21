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


const { addDailyCron, addWeeklyCron } = require('../helpers/queue');
const { User, Student, StudentAttendance, Attendance } = require('../models/index');
const { Op } = require('sequelize');
const moment = require('moment');
// const addDailyEmailToQueue = require('../helpers/dailyEmail');
router.get('/test', async (req, res, next) => {


  res.send('add')
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