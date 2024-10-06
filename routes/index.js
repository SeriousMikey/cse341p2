const router = require("express").Router();
router.use("/", require("./swagger"));
router.use("/donors", require("./donors"));
router.use("/charities", require("./charities"));
router.use("/donations", require("./donations"));
const passport = require("passport");

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

module.exports = router;