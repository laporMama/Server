const { getAll, getById, create } = require('../controllers/course')
const router = require('express').Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)

module.exports = router