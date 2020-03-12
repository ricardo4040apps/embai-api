var express = require("express");
var router = express.Router();
const Role = require("../models/role");
const passportMiddleware = require("../middlewares/passport");
const roleCtrl = require('../controllers/role');



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C R U D
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/", passportMiddleware, function (req, res, next) {
    roleCtrl.get(req, res, next);
});

router.get("/:id", passportMiddleware, function (req, res, next) {
    roleCtrl.getById(req, res, next);
});

router.post("/", passportMiddleware, function (req, res, next) {
    roleCtrl.create(req, res, next);
});

router.put("/:id", passportMiddleware, function (req, res, next) {
    roleCtrl.update(req, res, next);
});

router.delete("/:id", passportMiddleware, function (req, res, next) {
    roleCtrl.deleteById(req, res, next);
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C U S T O M S
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.put("/:id/permissions", passportMiddleware, function (req, res, next) {
    roleCtrl.updatePermissions(req, res, next);
});

router.get("/:id/permissions", passportMiddleware, function (req, res, next) {
    roleCtrl.getPermissions(req, res, next);
});

module.exports = router;
