var express = require("express");
var router = express.Router();
const Role = require("../models/role");
const passportMiddleware = require("../middlewares/passport");
const phoneVerificationCtrl = require('../controllers/phone-verification');



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C U S T O M S
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.post("/", function (req, res, next) {
    phoneVerificationCtrl.generatePhoneCode(req, res, next);
});

module.exports = router;


router.put("/", function (req, res, next) {
    phoneVerificationCtrl.verifyPhoneCode(req, res, next);
});

module.exports = router;
