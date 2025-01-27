/**
 * User Service Module
 * Handles business logic for user-related operations
 */

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

//Register a new user in the system
module.exports.registerUser = async (email, firstname, lastname, password) => {
    // Validate that all required fields are provided
    if (!email || !firstname || !lastname || !password) {
        throw new Error('All fields are required');
    }
 
    try {
        // Check if user already exists in database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password using the userModel static method
        // This uses bcrypt under the hood with proper salt rounds
        const hashedPassword = await userModel.hashPassword(password);

        // Create new user document in database
        const user = await userModel.create({
            email,
            fullname: {
                firstname,
                lastname,
            },
            password: hashedPassword,
        });

        // Return the Mongoose document itself
        return user;
    } catch (error) {
        // Log error for debugging and rethrow with original message
        console.error('Error during user registration:', error.message);
        throw new Error(error.message);
    }
};