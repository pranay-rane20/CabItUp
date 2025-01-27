const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: [true, 'First name is required'],
                trim: true
            },
            lastname: {
                type: String,
                required: [true, 'Last name is required'],
                trim: true
            }
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false
        },
        socketId: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: ['available', 'busy', 'offline'],
            default: 'offline'
        },
        vehicle: {
            color: {
                type: String,
                required: [true, 'Vehicle color is required']
            },
            plate: {
                type: String,
                required: [true, 'Vehicle plate number is required'],
                unique: true
            },
            capacity: {
                type: Number,
                required: [true, 'Vehicle capacity is required'],
                min: [1, 'Capacity must be at least 1']
            },vehicleType: {
                type: String,
                required: [true, 'Vehicle type is required'],
                enum: ['car','bike','auto'],
                lowercase: true
            }
        },
        location: { // Moved location inside the main schema definition
                longitude: {
                    type: Number,
                },
                latitude: {
                    type: Number,
                } 
        }
    },
    {
        timestamps: true
    }
);

// Generate JWT token
captainSchema.methods.generateAuthToken = async function () {
    const captain = this;
    const token = jwt.sign(
        { _id: captain._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

// Compare password method
captainSchema.methods.comparePassword = async function (candidatePassword) {
    const captain = this;
    return bcrypt.compare(candidatePassword, captain.password);
};

// Hash a password string
captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};


const Captain = mongoose.model('Captain', captainSchema);

module.exports = Captain;
