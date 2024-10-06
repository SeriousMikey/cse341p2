const express = require("express");
const router = express.Router();
const donorsController = require("../controllers/donors");
const validation = require("../middleware/donors_validator");
const { IsAuthenticated } = require("../middleware/authenticate");

// Gets all of the donors in the database
router.get("/", donorsController.getAll);

// Gets a single donor in the database with the userId
router.get("/:Id", donorsController.getSingle);

// Creates a donor
router.post("/", IsAuthenticated, validation.validate, donorsController.createAccount);

// Updates a donor
router.put("/:Id", IsAuthenticated, validation.validate, donorsController.updateAccount);

// Deletes a donor
router.delete("/:Id", IsAuthenticated, donorsController.deleteAccount);


module.exports = router;