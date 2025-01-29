const mongoose = require('mongoose');
const connect = () =>{
    mongoose.connect('mongodb://localhost:27017/uder-user', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB...');
}

module.exports = connect;