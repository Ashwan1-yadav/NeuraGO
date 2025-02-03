const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerDriver, driverLogin } = require("../controllers/driverController");
router.post(
  "/register",
  [
    body("firstName", "First Name must be at least 3 characters long").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    body("vehicleColor", "Color is required").notEmpty().isLength({ min: 3 }),
    body("vehicleType", "Vehicle Type is required").notEmpty().isIn(["car", "bike", "van"]),
    body("vehicleNoPlate", "Vehicle No Plate is required").notEmpty().isLength({ min: 9 }),
    body("vehicleCapacity", "Vehicle Capacity is required").isInt({ min: 1 }).notEmpty(),
  ],
  registerDriver
);

router.post("/login",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  ], driverLogin);

module.exports = router;