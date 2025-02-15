const RideModel = require("../models/rideModel");
const { getDistanceAndTime } = require("./mapService");
const crypto = require("crypto");

async function fareCalculation(pickUpAddress, destination) {
  if (!pickUpAddress || !destination) {
    throw new Error("Pick up address and destination are required");
  }
  const { distance, duration } = await getDistanceAndTime(
    pickUpAddress,
    destination
  );
  const baseFare = {
    auto: 30,
    car: 50,
    bike: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distance.value / 1000) * perKmRate.auto +
        (duration.value / 60) * perMinuteRate.auto
    ),

    car: Math.round(
      baseFare.car +
        (distance.value / 1000) * perKmRate.car +
        (duration.value / 60) * perMinuteRate.car
    ),

    bike: Math.round(
      baseFare.bike +
        (distance.value / 1000) * perKmRate.bike +
        (duration.value / 60) * perMinuteRate.bike
    ),
  };

  return fare;
}

async function generateOTP(digits) {
  if (!digits || digits <= 0) {
    throw new Error("Number of digits must be a positive number");
  }

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  const randomBytes = crypto.randomBytes(4);
  const randomNumber = parseInt(randomBytes.toString("hex"), 16);

  const otp = min + (randomNumber % (max - min + 1));

  return otp.toString().padStart(digits, "0");
}

module.exports.createRide = async (
  userId,
  pickUpAddress,
  destination,
  vehicleType
) => {
  if (!pickUpAddress || !destination || !vehicleType || !userId) {
    throw new Error("All fields are required");
  }
  try {
    const fare = await fareCalculation(pickUpAddress, destination, vehicleType);

    const { distance, duration } = await getDistanceAndTime(
      pickUpAddress,
      destination
    );

    const ride = new RideModel({
      user: userId,
      pickUpAddress,
      destination,
      vehicleType,
      fare: fare[vehicleType],
      otp: await generateOTP(6),
      status: "pending",
      duration: duration.text,
      distance: distance.text,
      paymentId: "",
      orderId: "",
      signature: "",
    });
    await ride.save();
    return ride;
  } catch (error) {
    throw new Error(`Error creating ride: ${error.message}`);
  }
};
