const driverModel = require("../models/driverModel");

const createDriver = async ({ firstName, lastName, email, password, vehicleColor, vehicleType, vehicleNoPlate, vehicleCapacity }) => {
     
    const driver = await driverModel.create({

        firstName, 
        lastName,
        email,
        password,
        vehicleColor,
        vehicleType,
        vehicleNoPlate,
        vehicleCapacity

    });
    return driver;
};

module.exports = { createDriver };