const router = require('express').Router();
const ParentController = require('../controllers/parent');

router.get('/:id', ParentController.getParentById);

module.exports = router;