const mongoose = require('mongoose');


const connectDB = async () => {
    try {
       mongoose.connect(process.env.MONGO_URI);
         console.log("Database Connected"); 
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;