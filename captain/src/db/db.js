const mongoose = require('mongoose');
const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/uder-captain'); 
        console.log('Connected to MongoDB...');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

module.exports = connect;