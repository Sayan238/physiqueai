const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    workoutType: { type: String },
    exercises: [{
        name: { type: String },
        sets: { type: Number },
        reps: { type: Number },
        weight: { type: Number },
    }],
    duration: { type: Number },
    completed: { type: Boolean, default: true },
}, { timestamps: true });

workoutLogSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
