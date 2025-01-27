/**
 * User Service Module
 * Handles business logic for user-related operations
 */

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

//Register a new user in the system
module.exports.createCaptain = async (email, firstname, lastname, password,color,plate,capacity,vehicleType) => {
    // Validate that all required fields are provided
    if (!email || !firstname || !lastname || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
 
    try {
        // Check if user already exists in database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user document in database
        const user = await userModel.create({
            email,
            fullname: {
                firstname,
                lastname,
            },
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });

        // Return the Mongoose document itself
        return user;
    } catch (error) {
        // Log error for debugging and rethrow with original message
        console.error('Error during user registration:', error.message);
        throw new Error(error.message);
    }
};