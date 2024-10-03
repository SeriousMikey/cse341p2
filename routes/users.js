const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");


// Gets all of the contacts in the database
router.get("/", usersController.getAll);

// Gets a single contact in the database with the userId
router.get("/:Id", usersController.getSingle);

// Creates a contact
router.post("/", usersController.createContact);

// Updates a contact
router.put("/:Id", usersController.updateContact);

// Deletes a contact
router.delete("/:Id", usersController.deleteContact);


module.exports = router;