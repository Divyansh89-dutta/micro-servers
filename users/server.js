const app = require('./src/app')
const connect = require('./src/db/db');
connect();
app.listen(3001, ()=>{
    console.log('Server is running on port 3001')
})