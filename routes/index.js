const router = require('express').Router();
const teacherRouter = require('./teacher');
const parentRouter = require('./parent');
const adminRouter = require('./admin');
const reportRouter = require('./report');
const Authentication = require('../middlewares/authentication');
const UserController = require('../controllers/user');
const ClassesController = require('../controllers/class');
const CoursesController = require('../controllers/course');

router.get('/courses', CoursesController.getAll);
router.get('/classes', ClassesController.getAll);
router.post('/login', UserController.login);

// pindahin attendance jadi 1 router sendiri

router.use(Authentication);
router.use('/reports', reportRouter)
router.use('/teachers', teacherRouter);
router.use('/parents', parentRouter);
router.use('/admin', adminRouter);

module.exports = router