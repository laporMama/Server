const router = require('express').Router();
const { getAll, setScore, updateScore, deleteScore, findByParent } = require('../controllers/report');
const { isTeacher } = require('../middlewares/authorization');

router.get('/parent', findByParent)
router.use(isTeacher);
router.get('/', getAll);
router.post('/', setScore);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

module.exports = router