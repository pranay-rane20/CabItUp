const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BlackListToken = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');


/**
 * Authentication middleware to protect routes
 * Verifies JWT token from cookies or Authorization header
 * Attaches user object to request if authentication successful
 */
module.exports.authUser = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        // Authorization header format: "Bearer <token>"
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        // Return error if no token found
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        // Check if token is blacklisted
        const isBlackListed = await BlackListToken.findOne({ token: token });
        if (isBlackListed) {
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
        console.error('Token verification error:', error.message); // Log the error message
        return res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Unauthorized user'});
    }

    const isBlackListed = await BlackListToken.findOne({ token: token });
    if(isBlackListed){
        return res.status(401).json({message: 'Unauthorized user'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id); // Corrected model name to match the import
        if(!captain){
            return res.status(401).json({message: 'Captain not found'});
        }
        req.captain = captain;
        return next();
    }catch(err){
        console.error('Token verification error:', err.message);
        return res.status(401).json({message: 'Invalid token'});
    }

}