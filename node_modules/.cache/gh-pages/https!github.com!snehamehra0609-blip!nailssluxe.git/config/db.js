const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nailss_luxe';
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 3000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
