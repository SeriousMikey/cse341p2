const router = require("express").Router();
router.use("/", require("./swagger"));
router.use("/donors", require("./donors"));
router.use("/charities", require("./charities"));
router.use("/donations", require("./donations"));


// Shows the home page
router.get("/", (req, res) => { res.send("Charities, Donations, and Donors.")});


module.exports = router;