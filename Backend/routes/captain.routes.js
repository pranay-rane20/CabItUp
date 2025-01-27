const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');

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

module.exports = router;