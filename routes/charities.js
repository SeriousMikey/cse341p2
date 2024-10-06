const express = require("express");
const router = express.Router();
const charitiesController = require("../controllers/charities");
const validation = require("../middleware/charities_validator");
const { IsAuthenticated } = require("../middleware/authenticate");


// Gets all of the charities in the database
router.get("/", charitiesController.getAll);

// Gets a single charity in the database with the userId
router.get("/:Id", charitiesController.getSingle);

// Creates a charity
router.post("/", IsAuthenticated, validation.validate, charitiesController.createCharity);

// Updates a charity
router.put("/:Id", IsAuthenticated, validation.validate, charitiesController.updateCharity);

// Deletes a charity
router.delete("/:Id", IsAuthenticated, charitiesController.deleteCharity);


module.exports = router;