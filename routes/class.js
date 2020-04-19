const router = require('express').Router()
const { getAll } = require('../controllers/class')

router.get('/',getAll)

module.exports = router