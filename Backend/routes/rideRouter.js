const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isLoggedInUser } = require("../middlewares/authMiddleware");
const { createRide } = require("../controllers/rideController");

router.post(
  "/createRide",
  body('pickUpAddress')
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pick up address"),
  body('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body('vehicleType')
    .isIn(["auto", "car", "bike"])
    .withMessage("Invalid vehicle type"),
  isLoggedInUser,
  createRide
);

module.exports = router;
