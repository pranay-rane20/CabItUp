const http = require('http');
const app = require('./app'); // Correctly reference the app.js file
const port = process.env.PORT || 3000;
const db = require('./db/db')
db();

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
