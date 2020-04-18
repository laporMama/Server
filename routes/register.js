const router = require('express').Router()
const { register } = require('../controllers/user.js')

router.post('/', register)

module.exports = router