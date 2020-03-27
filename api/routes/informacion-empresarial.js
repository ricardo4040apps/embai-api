var express = require('express');
var router = express.Router();
const InfoEmp = require('../models/informacion-empresarial');
const passportMiddleware = require('../middlewares/passport');
const infoEmpCtrl = require('../controllers/informacion-empresarial');

/* GET users listing. */


router.get('/', passportMiddleware, function (req, res, next) {
    infoEmpCtrl.getOwn(req, res, next);
});


router.put('/', passportMiddleware, function (req, res, next) {
    infoEmpCtrl.updateOwn(req, res, next);
});


module.exports = router;