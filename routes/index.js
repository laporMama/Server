const router = require('express').Router();
const teacherRouter = require('./teacher');
const parentRouter = require('./parent');
const adminRouter = require('./admin');
const Authentication = require('../middlewares/authentication');
const UserController = require('../controllers/user');
const ClassesController = require('../controllers/class');
const CoursesController = require('../controllers/course');

router.get('/courses', CoursesController.getAll);
router.get('/classes', ClassesController.getAll);
router.post('/login', UserController.login);

router.use(Authentication);
router.use('/teachers', teacherRouter);
router.use('/parents', parentRouter);
router.use('/admin', adminRouter);

module.exports = router