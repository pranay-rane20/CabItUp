const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { fullname, email, password, vehicle } = req.body;
    
    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist)
        return res.status(400).json({message: 'Captain already exist with this email'});

    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = await captain.generateAuthToken();
        res.status(201).json({
            message: 'Captain created successfully',
            captain,
            token
        });
    } catch (error) {
        next(error);
    }
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email }).select('+password');
        if(!captain){
            return res.status(404).json({message: 'Captain not found'});
        }
        const isPasswordMatch = await captain.comparePassword(password);
        if(!isPasswordMatch){
            return res.status(401).json({message: 'Invalid password'});
        }
        const token = await captain.generateAuthToken();

        
        res.cookie('token', token, {httpOnly: true});
        
        res.status(200).json({
            message: 'Captain logged in successfully',
            captain,
            token
        });
    } catch (error) {
        next(error);
    }
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({
        message: 'Captain profile fetched successfully',
        captain: req.captain
    });
}

module.exports.logoutCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message: 'Captain logged out successfully'});
}