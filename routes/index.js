const router = require('express').Router();
const teacherRouter = require('./teacher');
const parentRouter = require('./parent');
const UserController = require('../controllers/user');

router.get('/', (req, res, next) => res.send('hello'));
router.post('login', UserController.login);
router.post('/register', UserController.register);

router.use('/class', teacherRouter);

router.use('/parent', parentRouter);


module.exports = router