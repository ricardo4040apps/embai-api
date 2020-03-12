var express = require('express');
var router = express.Router();
const Corporation = require('../models/corporation');
const passportMiddleware = require('../middlewares/passport');
const corporationCtrl = require('../controllers/corporation');


/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
  corporationCtrl.get(req, res, next);
});


router.put('/', passportMiddleware, function(req, res, next) {
  corporationCtrl.get(req, res, next);
});

module.exports = router;

