const { getAll, getById } = require('../controllers/parent')
const router = require('express').Router()

router.get('/', getAll)
router.get('/:id', getById)

module.exports = router