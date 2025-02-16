const express = require("express");
const router = express.Router();
const { body,query } = require("express-validator");
const { isLoggedInUser } = require("../middlewares/authMiddleware");
const { createRide, getRideFare } = require("../controllers/rideController");


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

router.get('/getRideFare',
  isLoggedInUser,
  query('location').isString(),
  query('destination').isString(),
  getRideFare
)

module.exports = router;
