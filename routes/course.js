const router = require('express').Router()
const { getAll, create, update, destroy } = require('../controllers/course')
const { isAdmin } = require('../middlewares/authorization')

router.get('/', getAll)
router.use(isAdmin)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router