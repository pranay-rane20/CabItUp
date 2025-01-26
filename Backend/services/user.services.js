const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.registerUser = async (email, firstname, lastname, password) => {
    if (!email || !firstname || !lastname || !password) {
        throw new Error('All fields are required');
    }
 
    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password using the userModel static method
        const hashedPassword = await userModel.hashPassword(password);

        // Create user
        const user = await userModel.create({
            email,
            fullname: {
                firstname,
                lastname,
            },
            password: hashedPassword,
        });

        // Remove sensitive fields before returning
        const userResponse = user.toObject();
        delete userResponse.password;

        return userResponse;
    } catch (error) {
        console.error('Error during user registration:', error.message);
        throw new Error(error.message);
    }
};
