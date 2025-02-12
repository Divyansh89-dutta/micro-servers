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

// Generate JWT token
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, username: this.username, email: this.email }, 'your_secret_key', { expiresIn: '1h' });
};

// Verify JWT token
userSchema.statics.verifyToken = async function (token) {  // Fixed typo here
    return jwt.verify(token, 'your_secret_key');
};

// Corrected mongoose model initialization
const userModel = mongoose.model('User', userSchema);  // Fixed model creation

module.exports = userModel;
