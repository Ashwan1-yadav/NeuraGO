const { createRide,fareCalculation } = require('../services/rideService');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { pickUpAddress, destination, vehicleType } = req.body;
        const ride = await createRide(req.user._id, pickUpAddress, destination, vehicleType);
        return res.status(201).json(ride);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
 }

 module.exports.getRideFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { location, destination } = req.query;
        const fare = await fareCalculation(location, destination);
        return res.status(200).json(fare);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
 }  