const router = require('express').Router();
const { logWorkout, getWorkoutLogs } = require('../controllers/workoutController');
const auth = require('../middleware/auth');

router.post('/log', auth, logWorkout);
router.get('/logs', auth, getWorkoutLogs);

module.exports = router;
