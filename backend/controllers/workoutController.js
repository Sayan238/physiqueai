const WorkoutLog = require('../models/WorkoutLog');

exports.logWorkout = async (req, res) => {
    try {
        const { date, workoutType, exercises, duration, completed } = req.body;
        const log = await WorkoutLog.create({
            userId: req.userId,
            date: new Date(date),
            workoutType,
            exercises,
            duration,
            completed,
        });
        res.status(201).json({ log });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getWorkoutLogs = async (req, res) => {
    try {
        const logs = await WorkoutLog.find({ userId: req.userId })
            .sort({ date: -1 })
            .limit(60);
        res.json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
