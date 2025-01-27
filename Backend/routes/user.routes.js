/**
 * User Routes
 * Defines API endpoints for user authentication and profile management
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * POST /user/register
 * Register a new user account
 * Validates required fields and password strength
 */
router.post('/register',
    [
        // Validate email format
        body('email')
            .isEmail()
            .withMessage('Invalid Email'),
        
        // Validate required name fields
        body('fullname.firstname')
            .notEmpty()
            .withMessage('First Name is required'),
        body('fullname.lastname')
            .notEmpty()
            .withMessage('Last Name is required'),
        
        // Validate password strength
        body('password')
            .isStrongPassword()
            .withMessage('Password must be strong'),
    ],
    userController.registerUser
);

/**
 * POST /user/login 
 * Authenticate user credentials and login
 */
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

/**
 * GET /user/profile
 * Get authenticated user's profile
 * Requires valid JWT token
 */
router.get('/profile', 
    authMiddleware.authUser, 
    userController.getUserProfile
);

/**
 * GET /user/logout
 * Logout authenticated user and invalidate token
 * Requires valid JWT token
 */
router.get('/logout',
    authMiddleware.authUser,
    userController.logoutUser
);

module.exports = router;