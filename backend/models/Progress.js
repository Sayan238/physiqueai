const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    weight: { type: Number },
    caloriesConsumed: { type: Number },
    proteinConsumed: { type: Number },
    waterGlasses: { type: Number },
    notes: { type: String },
}, { timestamps: true });

progressSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Progress', progressSchema);
