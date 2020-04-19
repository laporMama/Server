const router = require('express').Router()
const { create, findAll, update, destroy, findByParent } = require('../controllers/attendances.js')
const { isTeacher, isToday } = require('../middlewares/authorization')

router.get('/', findAll)
router.get('/parent', findByParent)
router.use(isTeacher)
router.post('/', isToday, create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router