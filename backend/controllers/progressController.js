const Progress = require('../models/Progress');

exports.logProgress = async (req, res) => {
    try {
        const { date, weight, caloriesConsumed, proteinConsumed, waterGlasses, notes } = req.body;
        const entry = await Progress.findOneAndUpdate(
            { userId: req.userId, date: new Date(date) },
            { weight, caloriesConsumed, proteinConsumed, waterGlasses, notes },
            { upsert: true, new: true }
        );
        res.status(201).json({ entry });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getProgress = async (req, res) => {
    try {
        const entries = await Progress.find({ userId: req.userId })
            .sort({ date: -1 })
            .limit(90);
        res.json({ entries: entries.reverse() });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
