const express = require('express');
const expressProxy = require('express-http-proxy'); // Corrected import
const app = express();

// Proxy requests to /users to another server running on localhost:3001
app.get('/users', expressProxy('http://localhost:3001'));

// Proxy requests to /captain to another server running on localhost:3002
app.get('/captain', expressProxy('http://localhost:3002'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
