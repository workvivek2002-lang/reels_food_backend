const app = require("./src/app")
const evn = require('dotenv').config()

const connectDB = require('./src/database/db')

//Connecting Database
connectDB()

app.listen(3000,()=>{
    console.log("Express server start at port 3000");
    
})