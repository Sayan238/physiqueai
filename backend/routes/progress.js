const router = require('express').Router();
const { logProgress, getProgress } = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.post('/', auth, logProgress);
router.get('/', auth, getProgress);

module.exports = router;
