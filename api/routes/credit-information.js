var express = require('express');
var router = express.Router();
const Credit = require('../models/credit-information');
const passportMiddleware = require('../middlewares/passport');
const CreditCtrl = require('../controllers/credit-information');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    CreditCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    CreditCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    CreditCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    CreditCtrl.update(req, res, next);
});

router.delete('/:id', passportMiddleware, function(req, res, next) {
    CreditCtrl.deleteById(req, res, next);
});

module.exports = router;