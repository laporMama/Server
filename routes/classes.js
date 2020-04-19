const router = require('express').Router()
const { getAll } = require('../controllers/class.js')

router.get('/',getAll)

module.exports = router