const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    name: { type: String, required: true },
    googleId: { type: String },
    avatar: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female'] },
    height: { type: Number },
    weight: { type: Number },
    goalWeight: { type: Number },
    goal: { type: String, enum: ['muscle_gain', 'fat_loss', 'six_pack', 'maintenance'] },
    dietPreference: { type: String, enum: ['veg', 'non_veg', 'eggetarian'] },
    activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'extra_active'] },
    workoutExperience: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    bmi: { type: Number },
    tdee: { type: Number },
    calorieTarget: { type: Number },
    proteinTarget: { type: Number },
    profileComplete: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
