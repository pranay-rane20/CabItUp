const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// Check if the controller is defined
if (!captainController || !captainController.registerCaptain) {
    throw new Error('captainController.registerCaptain is not defined');
}

router.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('fullname.firstname')
        .notEmpty()
        .withMessage('First Name is required'),
    body('fullname.lastname')
        .notEmpty()
        .withMessage('Last Name is required'),
    body('password')
        .isStrongPassword()
        .withMessage('Password must be strong'),
    body('vehicle.color')
        .notEmpty()
        .withMessage('Vehicle color is required'),
    body('vehicle.plate')
        .notEmpty()
        .withMessage('Vehicle plate number is required'),
    body('vehicle.capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType')
        .isIn(['car', 'bike', 'auto'])
        .withMessage('Invalid vehicle type')
], captainController.registerCaptain);


router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
], captainController.loginCaptain);


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);


router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;