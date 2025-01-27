const Captain = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { fullname, email, password, vehicle } = req.body;
    
    const isCaptainAlreadyExist = await Captain.findOne({email});
    if(isCaptainAlreadyExist)
        return res.status(400).json({message: 'Captain already exist with this email'});

    const hashedPassword = await Captain.hashPassword(password);

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
