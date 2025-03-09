const { createRide, fareCalculation } = require("../services/rideService");
const { validationResult } = require("express-validator");
const {
  getDriverInRange,
  getAddressCoordinates,
} = require("../services/mapService");
const { sendMessage } = require("../utilities/socket")

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickUpAddress, destination, vehicleType } = req.body;
    const ride = await createRide(
      req.user._id,
      pickUpAddress,
      destination,
      vehicleType
    );
    const address_Coordinates = await getAddressCoordinates(pickUpAddress);
    const { latitude, longitude } = address_Coordinates;

    const driversInRange = await getDriverInRange(latitude, longitude, 2);
    if (!driversInRange || driversInRange.length === 0) {
      return res.status(400).json({ error: "No drivers found in range" });
    }
    ride.otp = "";

    driversInRange.map((driver) => {
       sendMessage(driver.socket_id, "new_ride", ride);
    });

    res.status(201).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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
};
