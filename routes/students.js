const router = require('express').Router()
const { create, getAll, updateId, deleteId, getByClassId, getChildren } = require('../controllers/student.js')
const { isAdmin } = require('../middlewares/authorization.js')

router.get('/', getAll)
router.get('/parent', getChildren)
router.get('/:id', getByClassId)
router.use(isAdmin)
router.post('/', create)
router.put('/:id', updateId)
router.delete('/:id', deleteId)

module.exports = router