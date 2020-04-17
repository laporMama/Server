const router = require('express').Router();
const teacherRouter = require('./teacher');
const parentRouter = require('./parent');
const adminRouter = require('./admin');
const Authentication = require('../middlewares/authentication');
const UserController = require('../controllers/user');

router.get('/', (req, res, next) => res.send('hello'));
router.post('/login', UserController.login);

router.use(Authentication);
router.use('/classes', teacherRouter);
router.use('/parents', parentRouter);
router.use('/admin', adminRouter);


module.exports = router