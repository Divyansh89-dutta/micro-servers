const app = require('./src/app');
const connect = require('./src/db/db');
connect();
app.listen(3002, ()=>{
    console.log('Server is running on port 3001')
})
