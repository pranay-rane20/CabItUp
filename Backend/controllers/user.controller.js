const userServices = require('../services/user.services');
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
 
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname: { firstname, lastname }, password } = req.body;

    try {
        const user = await userServices.registerUser(email, firstname, lastname, password);

        // Generate authentication token directly from the user instance
        const token = await user.generateAuthToken();

        res.status(201).json({
            message: 'User created successfully',
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};




module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = await user.generateAuthToken();

        res.status(200).json({
            message: 'User logged in successfully',
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
}

