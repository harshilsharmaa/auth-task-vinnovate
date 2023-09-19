const mongoose = require('mongoose');

const connectDB =  async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected...');
        return;
        
    } catch (error) {
        throw(error);
    }

}

module.exports = connectDB;