const router = require('express').Router();
const TeacherController = require('../controllers/teacher');
const StudentController = require('../controllers/student');
const { TeacherAuthorization } = require('../middlewares/authorization');

router.use(TeacherAuthorization);
router.get('/class/:ClassId', StudentController.getByClassId);
router.post('/attendance/:studentId', TeacherController.setAttendance);

//perlu ada: after teacher login => keluarin semua class => get all student by class

module.exports = router;