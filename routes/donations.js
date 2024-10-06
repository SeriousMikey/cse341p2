const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donations");
const { IsAuthenticated } = require("../middleware/authenticate");

// Gets all of the donations in the database
router.get("/", donationController.getAll);

// Gets a single donation in the database with the userId
router.get("/:Id", donationController.getSingle);

// Creates a donation
router.post("/", IsAuthenticated, donationController.createDonation);


module.exports = router;