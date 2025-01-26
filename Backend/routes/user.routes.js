const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/user.controller');
 
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').notEmpty().withMessage('First Name is required'),
        body('fullname.lastname').notEmpty().withMessage('Last Name is required'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('password').isStrongPassword().withMessage('Password must be strong'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    userController.registerUser
);




router.post('/login',body('email').isEmail().withMessage('Invalid Email'),body('password').notEmpty().withMessage('Password is required'),userController.loginUser);

module.exports = router;
