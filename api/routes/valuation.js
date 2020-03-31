var express = require('express');
var router = express.Router();
const Valuation = require('../models/valuation');
const passportMiddleware = require('../middlewares/passport');
const valuationCtrl = require('../controllers/valuation');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    valuationCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    valuationCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    valuationCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    valuationCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    valuationCtrl.deleteById(req, res, next);
});


module.exports = router;