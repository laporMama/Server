const router = require('express').Router()
const { getAll, create, update, destroy, getById } = require('../controllers/teacher.js')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router