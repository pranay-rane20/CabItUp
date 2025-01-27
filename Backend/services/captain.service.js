const Captain = require('../models/captain.model');
const { hashPassword } = Captain;

module.exports.createCaptain = async ({firstname,lastname,email,password,color,plate,capacity,vehicleType})=> {        
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }
    const hashedPassword = await hashPassword(password);
    const captain = await Captain.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashedPassword,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}
