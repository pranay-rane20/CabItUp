const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // This import is not needed since bcrypt is not used in this middleware


module.exports.auth = async (req, res, next) => {
    try {
        // Check for token in cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach user to request object
        req.user = user;
        return next();
    } catch (error) {
        // Handle invalid/expired tokens
        return res.status(401).json({ message: 'Invalid token' });
    }
}
