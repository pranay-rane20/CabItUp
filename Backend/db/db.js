const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB database using environment variables
 * Logs success or error message based on connection status
 */
function connectToDb() {
    // Attempt to connect to MongoDB using connection string from environment variables
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            // Log success message if connection is established
            console.log('Connected to MongoDB successfully');
        })
        .catch((error) => {
            // Log error message with details if connection fails
            console.error('Error connecting to MongoDB:', error.message);
        });
}

// Export the connection function to be used in other modules
module.exports = connectToDb;