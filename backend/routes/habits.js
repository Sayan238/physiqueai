const router = require('express').Router();
const { logHabits, getHabits } = require('../controllers/habitController');
const auth = require('../middleware/auth');

router.post('/', auth, logHabits);
router.get('/', auth, getHabits);

module.exports = router;
