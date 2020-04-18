const router = require('express').Router();
const { ParentAuthorization } = require('../middlewares/authorization');
const ParentController = require('../controllers/parent');
const StudentController = require('../controllers/student');

router.use(ParentAuthorization)
router.get('/:id(\\d+)', ParentController.getById);
router.get('/children', StudentController.getChildren);

module.exports = router;