const router = require('express').Router()
const { findAll } = require('../controllers/parent.js')
const { isAdmin } = require('../middlewares/authorization.js')

router.use(isAdmin)
router.get('/', findAll)

module.exports = router