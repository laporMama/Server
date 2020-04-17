const router = require('express').Router();
const ParentController = require('../controllers/parent');

router.get('/:id', ParentController.getById);

module.exports = router;