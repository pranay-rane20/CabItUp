/**
 * Server initialization file
 * Creates and starts HTTP server, connects to database
 */

// Import required dependencies
const http = require('http');
const app = require('./app');
const db = require('./db/db');

// Set port from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Initialize database connection
db();

// Create HTTP server instance with Express app
const server = http.createServer(app);

/**
 * Start server and listen on configured port
 * Logs message when server successfully starts
 */
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
