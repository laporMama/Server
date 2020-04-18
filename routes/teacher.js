const router = require('express').Router();
const TeacherController = require('../controllers/teacher');
const StudentController = require('../controllers/student');
const { TeacherAuthorization } = require('../middlewares/authorization');

router.use(TeacherAuthorization);
router.get('/class/:ClassId', StudentController.getByClassId);
router.post('/attendance/:studentId', TeacherController.setAttendance);
router.get('/score', TeacherController.getStudentScore); // path => /teachers/score?studentId=XXX&courseId=XXX
router.post('/score', TeacherController.setStudentScore); // subjectId & courseId dilempar via req.body

module.exports = router;