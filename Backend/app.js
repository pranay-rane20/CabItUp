/**
 * Main application file
 * Configures and initializes Express server with middleware and routes
 */

// Import required dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');


// Load environment variables from .env file
dotenv.config();

/**
 * Initialize Express application
 */
const app = express();

/**
 * Configure middleware
 */
// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse JSON bodies in requests
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies in requests
app.use(cookieParser());

/**
 * Define routes
 */
// Root route - basic health check
app.get('/', (req, res) => {
    res.send('Hello World');
});

// User routes
app.use('/user', userRoutes);

// Captain routes
app.use('/captain', captainRoutes);

// Export app for use in server
module.exports = app;
