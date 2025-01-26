const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

/**
 * Authentication middleware to protect routes
 * Verifies JWT token from cookies or Authorization header
 * Attaches user object to request if authentication successful
 */
module.exports.auth = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        // Authorization header format: "Bearer <token>"
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        // Return error if no token found
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        // Verify JWT token using secret key
        // Throws error if token is invalid or expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user in database using ID from token
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Add user object to request for use in protected routes
        req.user = user;
        return next();

    } catch (error) {
        // Return error for invalid/expired tokens
        return res.status(401).json({ message: 'Invalid token' });
    }
}
