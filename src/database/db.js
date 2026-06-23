const mongoose = require('mongoose')

const dbUrl = process.env.DB_URL


async function connectDB() {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connecting Successfuly...");
        
    }catch(err){
        console.log("Database connection error",err);
        
    }
    
}


module.exports=connectDB