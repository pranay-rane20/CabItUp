/**
 * User Model
 * Defines the schema and methods for User documents in MongoDB
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * User Schema
 * Defines the structure and validation rules for user documents
 */
const userSchema = new mongoose.Schema(
    {
        // User's full name
        fullname: {
            firstname: {
                type: String,
                required: true,
                trim: true,
                minlength: 2,
                maxlength: 50,
            },
            lastname: {
                type: String,
                trim: true,
                minlength: 2,
                maxlength: 50,
            },
        },
        // User's email address with validation
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address',
            ],
        },
        // Hashed password (not included in default queries)
        password: {
            type: String,
            required: true,
            select: false,
        },
        // Socket.io connection ID for real-time features
        socketId: {
            type: String,
            default: null,
        },
    },
    {
        // Automatically manage createdAt and updatedAt timestamps
        timestamps: true,
    }
);

//Generate JWT token for user authentication
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
    return token;
};

//Compare provided password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password);
};

// Hash a password string
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

/**
 * Hash password if it was modified during update
 * Called automatically before saving user document
 */
userSchema.methods.hashPasswordIfModified = async function() {
    if (this.isModified('password')) {
        this.password = await this.constructor.hashPassword(this.password);
    }
};

// Create the model from schema
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
