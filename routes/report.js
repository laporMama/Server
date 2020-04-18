const router = require('express').Router();
const ReportController = require('../controllers/report');
const { TeacherAuthorization } = require('../middlewares/authorization');

router.get('/', ReportController.getAll);

router.use(TeacherAuthorization);
router.post('/', ReportController.setScore);
router.put('/:id', ReportController.updateScore);
router.delete('/:id', ReportController.deleteScore);

module.exports = router