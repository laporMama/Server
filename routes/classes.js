const router = require('express').Router()
const { isAdmin } = require('../middlewares/authorization')
const { getAll, create, update, destroy } = require('../controllers/class.js')

router.get('/', getAll)

router.use(isAdmin)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router