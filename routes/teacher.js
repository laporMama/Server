const router = require('express').Router();
const TeacherController = require('../controllers/teacher');

router.get('/', TeacherController.getAllClass);
router.get('/:id', TeacherController.getAllStudentByClassId);
router.post('/:id/:studentId', TeacherController.setAttendance);
router.get('/:id/:subjectId/:studentId', TeacherController.getStudentScore);
router.post('/:id/:subjectId/:studentId', TeacherController.setStudentScore);

module.exports = router;