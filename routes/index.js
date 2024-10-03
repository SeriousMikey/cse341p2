const router = require("express").Router();
router.use("/users", require("./users"));
router.use("/", require("./swagger"));


// Shows the home page
router.get("/", (req, res) => { res.send("Hello World")});


module.exports = router;