const router = require('express').Router();
const login = require('./login.js')
const attendances = require('./attendances.js')
const register = require('./register.js')
const reports = require('./reports.js')
const students = require('./students.js')
const teachers = require('./teachers.js')
const isLogin = require('../middlewares/authentication.js')
const { isAdmin } = require('../middlewares/authorization.js')

router.use('/', login)
router.use(isLogin)
router.use('/reports', reports)
router.use('/attendances', attendances)
router.use(isAdmin)
router.use('/teachers', teachers)
router.use('/register', register)
router.use('/students', students)

module.exports = router