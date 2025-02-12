const express = require('express');
const userModel = require('./models/user.models');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

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
        delete userResponse.password; // Corrected delete statement

        res.status(201).json({
            message: 'User created successfully',
            user: userResponse, // Sending the user without password
            token
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        // Validate password using instance method
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        // Generate JWT token
        const token = user.generateToken();

        res.status(200).json({
            message: 'Logged in successfully',
            user,
            token
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = app;
