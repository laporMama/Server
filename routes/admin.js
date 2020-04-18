const router = require('express').Router();
const UserController = require('../controllers/user');
const ParentController = require('../controllers/parent');
const StudentController = require('../controllers/student');
const { AdminAuthorization } = require('../middlewares/authorization');

router.use(AdminAuthorization);
router.post('/register/parent', UserController.registerParent);
router.post('/register/student', UserController.registerStudent);
router.post('/register/teacher', UserController.registerTeacher);

router.get('/students', StudentController.getAll);
router.get('/parents', ParentController.getAll);
// router.post('/register/teacher', UserController.register);

module.exports = router;