const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
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
        password: {
            type: String,
            required: true,
            select: false,
        },
        socketId: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Generate JWT
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
    return token;
};

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password);
};
 
// Hash password before saving
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.hashPasswordIfModified = async function() {
    if (this.isModified('password')) {
        this.password = await this.constructor.hashPassword(this.password);
    }
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
