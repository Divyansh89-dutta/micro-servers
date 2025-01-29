const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'captain', 'admin'], // Allowed roles
        default: 'user' // Default role is "user"
    }
});

// Hash password before saving
userSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

// Validate password
userSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Generate JWT token with role
userSchema.methods.generateToken = function () {
    return jwt.sign(
        { id: this._id, username: this.username, email: this.email, role: this.role },
        'your_secret_key',
        { expiresIn: '1h' }
    );
};

// Verify JWT token
userSchema.statics.verifyToken = async function (token) {
    return jwt.verify(token, 'your_secret_key');
};

// Create user model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
