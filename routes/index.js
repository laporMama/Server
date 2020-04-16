const router = require('express').Router();
const teacher = require('./teacher')
const mama = require('./mama')

// ? Main Routing
router.get('/', res.send('hello'));
router.post('login', res.send('login'))
router.post('/register', res.send('register'))

// ? Teacher Routing
router.use(teacher)

// ? Mama Routing
router.use(mama)


module.exports = router