const router = require('express').Router()
const { getAll, create, update, destroy, getById } = require('../controllers/teacher.js')
const { isAdmin } = require('../middlewares/authorization.js')

router.get('/:id', getById)
router.use(isAdmin)
router.get('/', getAll)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router