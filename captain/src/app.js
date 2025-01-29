const express = require('express');
const userModel = require('./models/captain.models');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// User Registration Route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash password before saving
        const hashPassword = await userModel.hashPassword(password);

        // Create a new user with hashed password
        const newUser = await userModel.create({ username, email, password: hashPassword });

        // Generate JWT token
        const token = newUser.generateToken();

        // Convert user to an object and remove the password field
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User created successfully',
            user: userResponse,
            token
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// User Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Validate password using instance method
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = user.generateToken();

        // Convert user to an object and remove the password field
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: 'Logged in successfully',
            user: userResponse,
            token
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = app;
