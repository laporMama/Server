const router = require('express').Router();
const UserController = require('../controllers/user');
const ParentController = require('../controllers/parent');
const { AdminAuthorization } = require('../middlewares/authorization');

router.use(AdminAuthorization);
router.post('/register/parents', UserController.registerParent);
router.get('/parents/', ParentController.getAll);
// router.post('/register/student', UserController.register);
// router.post('/register/teacher', UserController.register);

module.exports = router;