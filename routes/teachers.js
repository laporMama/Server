const router = require('express').Router()
const { getAll, create, update, destroy } = require('../controllers/teacher.js')

router.get('/', getAll)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router