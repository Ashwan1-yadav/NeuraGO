const { validationResult } = require("express-validator");
const driverModel = require("../models/driverModel");
const { createDriver } = require("../services/driverService");
const jwt = require("jsonwebtoken");

const registerDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password, vehicleColor, vehicleType, vehicleNoPlate, vehicleCapacity } = req.body;

  if (!firstName || !lastName || !email || !password || !vehicleColor || !vehicleType || !vehicleNoPlate || !vehicleCapacity) {
    throw new Error("All fields are required");
  }

  const isDriverExist = await driverModel.findOne({ email });

  if (isDriverExist) {
    return res.status(400).json({ msg: "Driver already exists" });
  }

  const hashPass = await driverModel.hashPass(password);

  const driver = await createDriver({
    firstName,
    lastName,
    email,
    password : hashPass,
    vehicleColor,
    vehicleType,
    vehicleNoPlate,
    vehicleCapacity,
  });
  const token = await jwt.sign({ _id: driver._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.status(201).json({ driver, token });
};

module.exports = {
  registerDriver,
};
