const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'physiqueai_secret_key';
const JWT_EXPIRY = '30d';

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword, name });
        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                profileComplete: user.profileComplete,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                profileComplete: user.profileComplete,
                goal: user.goal,
                bmi: user.bmi,
                tdee: user.tdee,
                calorieTarget: user.calorieTarget,
                proteinTarget: user.proteinTarget,
                weight: user.weight,
                height: user.height,
                age: user.age,
                gender: user.gender,
                dietPreference: user.dietPreference,
                activityLevel: user.activityLevel,
                workoutExperience: user.workoutExperience,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        const { email, name, googleId, avatar } = req.body;

        let user = await User.findOne({ $or: [{ googleId }, { email }] });
        if (!user) {
            user = await User.create({ email, name, googleId, avatar });
        }

        const token = generateToken(user._id);
        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                profileComplete: user.profileComplete,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
