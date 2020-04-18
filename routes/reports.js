const router = require('express').Router();
const { getAll, setScore, updateScore, deleteScore } = require('../controllers/report');
const { isTeacher } = require('../middlewares/authorization');

router.get('/', getAll);
router.use(isTeacher);
router.post('/', setScore);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

module.exports = router