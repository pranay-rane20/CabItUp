const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').notEmpty().withMessage('First Name is required'),
        body('fullname.lastname').notEmpty().withMessage('Last Name is required'),
        body('password').isStrongPassword().withMessage('Password must be strong'),
    ],
    userController.registerUser
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    userController.loginUser
);

router.get('/profile', authMiddleware.auth, userController.getProfile);

module.exports = router;