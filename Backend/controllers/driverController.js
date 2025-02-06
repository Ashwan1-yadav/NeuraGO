const { validationResult } = require("express-validator");
const driverModel = require("../models/driverModel");
const { createDriver } = require("../services/driverService");
const BlockedTokenModel = require("../models/blockedToken");

const registerDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password, vehicleColor, vehicleType, vehicleNoPlate, vehicleCapacity } = req.body;

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
   
    const token = await driver.genAuthToken() 
    res.status(200).json({ driver, token });
};

const driverLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const driver = await driverModel.findOne({ email });

  if (!driver) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatchPass = await driver.comparePass(password);

  if (!isMatchPass) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await driver.genAuthToken()

  res.cookie("token", token);

  res.status(200).json({ token, driver });
};

const driverProfile = async (req, res) => {
  res.status(200).json({ driver : req.driver});
}

const driverLogout = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlockedTokenModel.create({ token });
  
  res.clearCookie("token");
  res.status(200).json({ message: "Driver Logged Out" });
};




module.exports = {
  registerDriver,
  driverLogin,
  driverLogout,
  driverProfile
};
