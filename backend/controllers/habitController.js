const Habit = require('../models/Habit');

exports.logHabits = async (req, res) => {
    try {
        const { date, habits } = req.body;
        const entry = await Habit.findOneAndUpdate(
            { userId: req.userId, date: new Date(date) },
            { habits },
            { upsert: true, new: true }
        );
        res.status(201).json({ entry });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getHabits = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const entries = await Habit.find({
            userId: req.userId,
            date: { $gte: thirtyDaysAgo },
        }).sort({ date: -1 });

        res.json({ entries });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
