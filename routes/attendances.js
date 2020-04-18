const router = require('express').Router()
const { create, findAll, update, destroy } = require('../controllers/attendances.js')
const { isTeacher } = require('../middlewares/authorization')

router.get('/', findAll)
router.use(isTeacher)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router