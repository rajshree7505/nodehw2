const mongoose = require('mongoose');

async function connection() {
    try {
        // Await the connection promise
        await mongoose.connect('mongodb://localhost:27017/nodehw2', {
           // useNewUrlParser: true,
            //useUnifiedTopology: true
            serverSelectionTimeoutMS: 20000, // Increase the timeout
            
        });
        console.log('MongoDB connected successfully ');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}


module.exports =  connection;

