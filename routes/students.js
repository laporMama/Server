const router = require('express').Router()
const { create, getAll, updateId, deleteId, getByClassId } = require('../controllers/student.js')

router.post('/', create)
router.get('/:id',getByClassId)
router.get('/', getAll)
router.put('/:id', updateId)
router.delete('/:id', deleteId)

module.exports = router