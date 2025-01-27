const userServices = require('../services/user.service');
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const BlackListToken = require('../models/blackListToken.model');



 //Register a new user
module.exports.registerUser = async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { 
        email, 
        fullname: { firstname, lastname }, 
        password 
    } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    if(isUserAlreadyExist){
        return res.status(400).json({message: 'User already exist with this email'});
    }

    try {
        // Create new user using service
        const user = await userServices.registerUser(email, firstname, lastname, password);

        // Generate authentication token
        const token = await user.generateAuthToken();

        // Send success response
        res.status(201).json({
            message: 'User created successfully',
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};


//Login existing user
module.exports.loginUser = async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract login credentials
    const { email, password } = req.body;

    try {
        // Find user by email (include password field)
        const user = await userModel.findOne({ email }).select('+password');

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate authentication token
        const token = await user.generateAuthToken();

        // Set HTTP-only cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Send success response
        res.status(200).json({
            message: 'User logged in successfully',
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};


//Get user profile
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ 
        message: 'Profile fetched successfully', 
        user: req.user 
    });
};


//Get user logout
module.exports.logoutUser = async (req, res, next) => {
    try {
        // Clear the cookie first
        res.clearCookie('token');

        // Get token from cookie or authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: 'No token found' });
        }

        // Blacklist the token
        await BlackListToken.create({ token });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};